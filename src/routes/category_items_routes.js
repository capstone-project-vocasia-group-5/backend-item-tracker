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
 * /admin/category-items/total:
 *   get:
 *     tags: [Category Items]
 *     summary: Get all categories with total items
 *     description: Retrieve all categories with the total items count.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category_id:
 *                     type: string
 *                     example: "category_id_123"
 *                   name:
 *                     type: string
 *                     example: "Electronics"
 *                   total:
 *                     type: integer
 *                     example: 10
 *                 required:
 *                   - id
 *                   - name
 *                   - totas
 *       401:
 *         description: Unauthorized - User not authenticated
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
 *                   example: "Unauthorized"
 */
categoryItemRoutes.get(
  "/admin/category-items/total",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  categoryItemController.getAllCategoryWithTotalItems
);

module.exports = categoryItemRoutes;
