const express = require("express");
const testController = require("../controllers/test_controller");

const testRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: API for health check
 */

/**
 * @swagger
 * /test/health:
 *   get:
 *     tags: [Health]
 *     summary: Check if the server is up and running
 *     responses:
 *       200:
 *         description: Server is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ping:
 *                   type: string
 *                   example: "pong !"
 */
testRoutes.get("/test/health", testController.healthCheck);

module.exports = testRoutes;
