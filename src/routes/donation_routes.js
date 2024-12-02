const express = require("express");
const donationRoutes = express.Router();
const donationController = require("../controllers/donation_controller");

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: API for managing donations
 */

/**
 * @swagger
 * /donations:
 *   post:
 *     tags: [Donations]
 *     summary: Create a new donation
 *     description: Allows a user to create a new donation by providing the necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "user_id"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               amount:
 *                 type: number
 *                 example: 15000
 *               is_anonymous:
 *                 type: boolean
 *                 example: false
 *               status:
 *                 type: string
 *                 enum: ["pending", "success", "failed"]
 *                 example: "pending"

 *     responses:
 *       201:
 *         description: Donation successfully created
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
 *                   example: Donation created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     donation:
 *                       type: object
 *                       properties:
 *                         payment_url:
 *                           type: string
 *                           example: "payment url"
 *       400:
 *         description: Bad Request - Validation error or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 */

donationRoutes.post("/donations", donationController.createDonation);

donationRoutes.post("/midtrans-webhook", donationController.midtransWebHook);
module.exports = donationRoutes;
