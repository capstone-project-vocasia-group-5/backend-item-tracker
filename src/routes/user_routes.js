const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/user_controller");
const auth = require("../middlewares/auth");
const CFG = require("../config/const");
const { uploadMultiple } = require("../middlewares/multers");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
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
userRoutes.get("/users", auth.authenticateUser, userController.getUser);

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
 * /users:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
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
  "/users",
  uploadMultiple,
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

module.exports = userRoutes;
