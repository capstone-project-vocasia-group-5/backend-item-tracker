const express = require("express");
const authRoutes = express.Router();
const authController = require("../controllers/auth_controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Allows a new user to register by providing necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInputSignUp'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "user_id"
 *                         name:
 *                           type: string
 *                           example: "Suga Kim"
 *                         username:
 *                           type: string
 *                           example: "suga"
 *                         email:
 *                           type: string
 *                           example: "suga@example.com"
 *                         phone_number:
 *                           type: string
 *                           example: "088181818181"
 *                         image_url:
 *                           type: string
 *                           example: null
 *                         role:
 *                           type: string
 *                           example: "user"
 *                         is_verified:
 *                           type: boolean
 *                           example: true
 *                         created_at:
 *                           type: string
 *                           example: "2022-01-01T00:00:00.000Z"
 *       400:
 *         description: Bad Request - Validation error or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 */
authRoutes.post("/auth/register", authController.signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags: [Auth]
 *     summary: Sign In user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sign In successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: successfully Sign In
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: jwt_token_here
 *                     user:
 *                       $ref: '#/components/schemas/User'
 */
authRoutes.post("/auth/signin", authController.signIn);

/**
 * @swagger
 * /auth/admin/signin:
 *   post:
 *     tags: [Auth]
 *     summary: Sign In user Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sign In successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: successfully Sign In
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: jwt_token_here
 *                     user:
 *                       $ref: '#/components/schemas/User'
 */
authRoutes.post("/auth/admin/signin", authController.signInCMS);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Forgot Password
 *     description: Send a password reset link or OTP to the user's email or phone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["email"]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset link/OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password reset link sent successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User not found
 */
authRoutes.post("/auth/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /auth/otp:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate user using OTP
 *     description: Verify the OTP sent to the user's email or phone for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["otp", "user_id"]
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               user_id:
 *                 type: string
 *                 example: "user_id_here"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid or expired OTP
 */
authRoutes.post("/auth/otp", authController.authenticateOTP);

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Send OTP to user's email
 *     description: Generates an OTP and sends it to the specified user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["email"]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP generated and sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully
 *       400:
 *         description: Failed to send OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Failed to send OTP
 */
authRoutes.post("/auth/send-otp", authController.sendOTP);

module.exports = authRoutes;
