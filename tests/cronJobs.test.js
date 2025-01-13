const { Sequelize } = require('sequelize');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const setupTestDB = require('./setupTestDB');
const { Timer } = require('../models');
const sendDueMessagesByTimers = require('../config/cronJobs').sendDueMessagesByTimers;
const stopScheduledTask = require('../config/cronJobs').stopScheduledTask;

const mockAxios = new MockAdapter(axios);

describe('sendDueMessagesByTimers', () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = await setupTestDB();
  });

  beforeEach(stopScheduledTask)

  afterEach(async () => {
    await Timer.destroy({ where: {} });
    mockAxios.reset();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should send messages for due timers and mark them as sent', async () => {
    const timers = await Timer.bulkCreate([
      { triggerDate: new Date(), isSent: false, failureCount: 0, url: 'http://example.com', message: 'Hello' },
      { triggerDate: new Date(), isSent: false, failureCount: 0, url: 'http://example.com', message: 'World' }
    ]);

    mockAxios.onPost('http://example.com').reply(200);

    await sendDueMessagesByTimers();

    const updatedTimers = await Timer.findAll();
    expect(updatedTimers[0].isSent).toBe(true);
    expect(updatedTimers[1].isSent).toBe(true);

    expect(mockAxios.history.post.length).toBe(2);
  });

  it('should increment failure count if sending message fails', async () => {
    const timer = await Timer.create({ triggerDate: new Date(), isSent: false, failureCount: 0, url: 'http://example.com', message: 'Hello' });

    mockAxios.onPost('http://example.com').reply(500);

    await sendDueMessagesByTimers();

    const updatedTimer = await Timer.findByPk(timer.id);
    expect(updatedTimer.failureCount).toBe(1);
    expect(updatedTimer.isSent).toBe(false);
  });

  fit('should handle race condition where two instances of the cron job are running simultaneously', async () => {
    const timers = await Timer.bulkCreate([
      { triggerDate: new Date(), isSent: false, failureCount: 0, url: 'http://example.com', message: 'Hello' },
      { triggerDate: new Date(), isSent: false, failureCount: 0, url: 'http://example.com', message: 'World' }
    ]);

    mockAxios.onPost('http://example.com').reply(200);

    // Run both instances of the cron job simultaneously
    await Promise.allSettled([sendDueMessagesByTimers(), sendDueMessagesByTimers()]);

    const updatedTimers = await Timer.findAll();
    expect(updatedTimers[0].isSent).toBe(true);
    expect(updatedTimers[1].isSent).toBe(true);

    // Verify that the second cron job found no timers to process
    expect(Timer.findAll.mock.calls[1][0]).toEqual({
      where: {
        isSent: false,
        failureCount: { [Sequelize.Op.lt]: expect.any(Number) },
        triggerDate: { [Sequelize.Op.lte]: expect.any(Date) }
      },
      lock: true,
      skipLocked: true,
      transaction: expect.any(Object)
    });
    expect(Timer.findAll.mock.results[1].value).resolves.toEqual([]);
  });
});