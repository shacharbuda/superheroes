/**
 * @swagger
 * components:
 *   schemas:
 *     Superhero:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         alias:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         fullName:
 *           type: string
 *         powers:
 *           type: array
 *           items:
 *             type: string
 *         weaknesses:
 *           type: array
 *           items:
 *             type: string
 *         origin:
 *           type: string
 *         isGood:
 *           type: boolean
 *         sentMessages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               timerId:
 *                 type: integer
 *               message:
 *                 type: string
 *         remainingMessages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               timerId:
 *                 type: integer
 *               message:
 *                 type: string
 *     SuperheroInput:
 *       type: object
 *       properties:
 *         alias:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         powers:
 *           type: array
 *           items:
 *             type: string
 *         weaknesses:
 *           type: array
 *           items:
 *             type: string
 *         origin:
 *           type: string
 *         isGood:
 *           type: boolean
 *       example:
 *         alias: "superman"
 *         firstName: "clark"
 *         lastName: "kent"
 *         powers: ["Flight", "X-ray vision"]
 *         weaknesses: ["Kryptonite"]
 *         origin: "Krypton"
 *         isGood: true
 */

/**
 * @swagger
 * /superheros/{id}:
 *   get:
 *     summary: Get a superhero by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The superhero ID
 *         example: 1
 *     responses:
 *       200:
 *         description: The superhero description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Superhero'
 *       404:
 *         description: Superhero not found
 *   post:
 *     summary: Create a new superhero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuperheroInput'
 *     responses:
 *       201:
 *         description: Superhero created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Superhero'
 *       400:
 *         description: Invalid input
 */