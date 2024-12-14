const express = require("express");
const categoryItemRoutes = express.Router();
const categoryItemController = require("../controllers/category_item_controller");
const auth = require("../middlewares/auth");
const CFG = require("../config/const");

/**
 * @swagger
 * tags:
 *   name: Category Items
 *   description: API for managing category items
 */

/**
 * @swagger
 * /category-items/{category_id}/{item_id}:
 *   get:
 *     tags: [Category Items]
 *     summary: Get category item by category ID and item ID
 *     description: Retrieve a specific category item by providing the category ID and item ID.
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "category_id_123"
 *         description: The category ID
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "item_id_123"
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Category item retrieved successfully
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
 *                   example: Category item retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category_id:
 *                       type: string
 *                       example: "category_id_123"
 *                     item_id:
 *                       type: string
 *                       example: "item_id_123"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - User lacks the necessary permissions
 *       404:
 *         description: Not Found - Category item not found
 */

categoryItemRoutes.get(
  "/admin/category-items/:id/total",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  categoryItemController.getTotalItemByCategory
);

module.exports = categoryItemRoutes;
