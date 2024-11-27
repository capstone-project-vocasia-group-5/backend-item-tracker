const express = require("express");
const commentRoutes = express.Router();
const commentController = require("../controllers/comment_controller");
const auth = require("../middlewares/auth");
const CFG = require("../config/const");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments
 */

/**
 * @swagger
 * /comments/{item_id}:
 *   post:
 *     tags: [Comments]
 *     summary: Create a new comment
 *     description: Allows a user to create a new comment for an item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment_text
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "user_id"
 *               item_id:
 *                 type: string
 *                 example: "item_id"
 *               comment_text:
 *                 type: string
 *                 example: "This is a great product!"
 *     responses:
 *       201:
 *         description: Comment successfully created
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
 *                   example: Comment created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "comment_id"
 *                         user_id:
 *                           type: string
 *                           example: "user_id"
 *                         item_id:
 *                           type: string
 *                           example: "item_id"
 *                         comment_text:
 *                           type: string
 *                           example: "This is a great product!"
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
commentRoutes.post(
  "/comments/:item_id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  commentController.createComment
);

/**
 * @swagger
 * /comments/{comment_id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get a comment by ID
 *     description: Retrieve a comment by its unique comment ID.
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "comment_id"
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
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
 *                   example: Comment retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "comment_id"
 *                     user_id:
 *                       type: string
 *                       example: "user_id"
 *                     item_id:
 *                       type: string
 *                       example: "item_id"
 *                     comment_text:
 *                       type: string
 *                       example: "This is a great product!"
 *                     created_at:
 *                       type: string
 *                       example: "2022-01-01T00:00:00.000Z"
 *       404:
 *         description: Comment not found
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
 *                   example: Comment not found
 */
commentRoutes.get(
  "/comments/:comment_id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  commentController.getCommentById
);

/**
 * @swagger
 * /comments/{item_id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get comments by item ID
 *     description: Retrieve all comments for a specific item by its item ID.
 *     parameters:
 *       - name: item_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "item_id"
 *     responses:
 *       200:
 *         description: Comments retrieved successfully for the item
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
 *                   example: Comments retrieved successfully for the item
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "comment_id"
 *                       user_id:
 *                         type: string
 *                         example: "user_id"
 *                       item_id:
 *                         type: string
 *                         example: "item_id"
 *                       comment_text:
 *                         type: string
 *                         example: "This is a great product!"
 *                       created_at:
 *                         type: string
 *                         example: "2022-01-01T00:00:00.000Z"
 */
commentRoutes.get(
  "/item/comments/:item_id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  commentController.getCommentByItemId
);

/**
 * @swagger
 * /comments/{comment_id}:
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment
 *     description: Update a specific comment by comment ID.
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "comment_id"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment_text
 *             properties:
 *               comment_text:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment successfully updated
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
 *                   example: Comment updated successfully
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Comment not found
 */
commentRoutes.put(
  "/comments/:comment_id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  commentController.updateComment
);

/**
 * @swagger
 * /comments/{comment_id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     description: Delete a specific comment by comment ID.
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "comment_id"
 *     responses:
 *       200:
 *         description: Comment successfully deleted
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
 *                   example: Comment deleted successfully
 *       404:
 *         description: Comment not found
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
 *                   example: Comment not found
 */
commentRoutes.delete(
  "/comments/:comment_id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  commentController.deleteComment
);

/**
 * @swagger
 * /comments/total/{item_id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get the total number of comments for a specific item
 *     description: Retrieve the total number of comments for a specific item by item ID.
 *     parameters:
 *       - name: item_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "item_id"
 *     responses:
 *       200:
 *         description: Total comments count for the item retrieved successfully
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
 *                   example: Total comments count for the item retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_comments:
 *                       type: integer
 *                       example: 50
 */
commentRoutes.get(
  "/comments/total/:item_id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  commentController.getTotalItemComment
);

module.exports = commentRoutes;
