const express = require("express");
const contactRoutes = express.Router();
const contactController = require("../controllers/contact_controller");

/**
 * @swagger
 * /send-mail:
 *   post:
 *     tags: [Contact]
 *     summary: Send email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email sent successfully
 */
contactRoutes.post("/send-mail", contactController.contactUs);

module.exports = contactRoutes;
