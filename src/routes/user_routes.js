const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/user_controller");
const auth = require("../middlewares/auth");
const CFG = require("../config/const");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
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
userRoutes.post("/users/register", userController.signUp);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags: [Users]
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
userRoutes.post("/users/signin", userController.signIn);

/**
 * @swagger
 * /admin/users/signin:
 *   post:
 *     tags: [Users]
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
userRoutes.post("/admin/users/signin", userController.signInCMS);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRoutes.get("/users/:id", auth.authenticateUser, userController.getUserById);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRoutes.get(
  "/admin/users",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  userController.getAllUsersCMS
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInputUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
userRoutes.patch(
  "/users/:id",
  auth.authenticateUser,
  userController.updateUser
);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRoutes.delete(
  "/admin/users/:id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  userController.deleteUserCMS
);

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     tags: [Users]
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
userRoutes.post("/users/forgot-password", userController.forgotPassword);

/**
 * @swagger
 * /users/otp:
 *   post:
 *     tags: [Users]
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
userRoutes.post("/users/otp", userController.authenticateOTP);

module.exports = userRoutes;
