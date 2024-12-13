const express = require("express");
const notificationRoutes = express.Router();
const notificatonController = require("../controllers/notification_controller");
const auth = require("../middlewares/auth");
const CFG = require("../config/const");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 */

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     tags: [Notifications]
 *     summary: Update the notification status by ID
 *     description: Marks the notification as read or unread.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_read:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Notification status updated successfully
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
 *                   example: Notification updated successfully
 *       404:
 *         description: Notification not found
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
 *                   example: Notification not found
 */
notificationRoutes.put(
  "/notifications/:id",
  auth.authenticateUser,
  notificatonController.updateNotification
);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     tags: [Notifications]
 *     summary: Get notification by ID
 *     description: Retrieve the notification details by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification to retrieve
 *     responses:
 *       200:
 *         description: Notification retrieved successfully
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
 *                   example: Notification retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     notification:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "notification_id"
 *                         user_id:
 *                           type: string
 *                           example: "user_id"
 *                         claim_id:
 *                           type: string
 *                           example: "claim_id"
 *                         is_read:
 *                           type: boolean
 *                           example: false
 *                         created_at:
 *                           type: string
 *                           example: "2022-01-01T00:00:00.000Z"
 *       404:
 *         description: Notification not found
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
 *                   example: Notification not found
 */
notificationRoutes.get(
  "/notifications/:id",
  auth.authenticateUser,
  notificatonController.getNotificationById
);

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Get notifications for a specific user
 *     description: Retrieve a list of notifications for a specific user.
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
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
 *                   example: Notifications retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     notification:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "notification_id"
 *                           user_id:
 *                             type: string
 *                             example: "user_id"
 *                           claim_id:
 *                             type: string
 *                             example: "claim_id"
 *                           is_read:
 *                             type: boolean
 *                             example: false
 *                           created_at:
 *                             type: string
 *                             example: "2022-01-01T00:00:00.000Z"
 *       404:
 *         description: No notifications found for the user
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
 *                   example: No notifications found for this user
 */
notificationRoutes.get(
  "/notifications",
  auth.authenticateUser,
  notificatonController.getNotificationByUserId
);

/**
 * @swagger
 * /admin/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Get notifications for admin
 *     description: Retrieve a list of notifications for admin.
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
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
 *                   example: Notifications retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     notification:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "notification_id"
 *                           user_id:
 *                             type: string
 *                             example: "user_id"
 *                           claim_id:
 *                             type: string
 *                             example: "claim_id"
 *                           is_read:
 *                             type: boolean
 *                             example: false
 *                           created_at:
 *                             type: string
 *                             example: "2022-01-01T00:00:00.000Z"
 */
notificationRoutes.get(
  "/admin/notifications",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  notificatonController.getNotificationByAdmin
);

/**
 * @swagger
 * /notifications/set-read:
 *   put:
 *     tags: [Notifications]
 *     summary: Mark all notifications as read
 *     description: Sets all notifications for the authenticated user as read.
 *     responses:
 *       200:
 *         description: All notifications marked as read successfully
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
 *                   example: All notifications marked as read successfully
 *       401:
 *         description: Unauthorized - User is not authenticated
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
 *                   example: Unauthorized
 */
notificationRoutes.put(
  "/notifications/all/set-read",
  auth.authenticateUser,
  notificatonController.setAllNotificationAsRead
);

/**
 * @swagger
 * /notifications/unread:
 *   get:
 *     tags: [Notifications]
 *     summary: Get all unread notifications
 *     description: Gets all unread notifications for the authenticated user.
 *     responses:
 *       200:
 *         description: A list of unread notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: []
 *       401:
 *         description: Unauthorized - User is not authenticated
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
 *                   example: Unauthorized
 */
notificationRoutes.get(
  "/notifications/unread/total",
  auth.authenticateUser,
  notificatonController.getUnreadNotifications
);

module.exports = notificationRoutes;
