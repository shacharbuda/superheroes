/**
 * @swagger
 * components:
 *   schemas:
 *     Timer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         timeLeftInSeconds:
 *           type: integer
 *         triggerDate:
 *           type: string
 *           format: date-time
 *         isSent:
 *           type: boolean
 *         isTryToSent:
 *           type: boolean
 *         url:
 *           type: string
 *         message:
 *           type: string
 *         senderSuperheroId:
 *           type: integer
 *         senderSuperheroFullName:
 *           type: string
 *       example:
 *         id: 1
 *         timeLeftInSeconds: 0
 *         triggerDate: "2025-01-13T10:51:48.760Z"
 *         isSent: true
 *         isTryToSent: false
 *         url: "https://message-reciever.onrender.com/api/message"
 *         message: "now"
 *         senderSuperheroId: 1
 *         senderSuperheroFullName: "Clark Kent"
 *     TimerInput:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         superheroId:
 *           type: integer
 *         url:
 *           type: string
 *         hours:
 *           type: integer
 *         minutes:
 *           type: integer
 *         seconds:
 *           type: integer
 *       example:
 *         message: "This is a test message"
 *         superheroId: 1
 *         hours: 0
 *         minutes: 2
 *         seconds: 0
 *         url: "https://message-reciever.onrender.com/api/message"
 */

/**
 * @swagger
 * /timers/{id}:
 *   get:
 *     summary: Get a timer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The timer ID
 *         example: 1
 *     responses:
 *       200:
 *         description: The timer description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Timer'
 *       404:
 *         description: Timer not found
 * /timers:
 *   post:
 *     summary: Create a new timer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimerInput'
 *     responses:
 *       201:
 *         description: Timer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Timer'
 *       400:
 *         description: Invalid input
 */