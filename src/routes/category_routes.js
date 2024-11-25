const express = require("express");
const categoryRoutes = express.Router();
const categoryController = require("../controllers/category_controller");
const auth = require("../middlewares/auth");
const CFG = require("../config/const");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /admin/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "category_id_123"
 *                   name:
 *                     type: string
 *                     example: "Electronics"
 *                   created_at:
 *                     type: string
 *                     example: "2023-01-01T00:00:00.000Z"
 *                   updated_at:
 *                     type: string
 *                     example: "2023-01-01T00:00:00.000Z"
 */

categoryRoutes.get(
  "/admin/categories",
  auth.authenticateUser,
  categoryController.getAllCategories
);

/**
 * @swagger
 * /admin/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get a category by ID
 *     description: Retrieve a single category by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: string
 *           example: "category_id_123"
 *     responses:
 *       200:
 *         description: A single category object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "category_id_123"
 *                 name:
 *                   type: string
 *                   example: "Electronics"
 *                 created_at:
 *                   type: string
 *                   example: "2023-01-01T00:00:00.000Z"
 *                 updated_at:
 *                   type: string
 *                   example: "2023-01-01T00:00:00.000Z"
 *       404:
 *         description: Category not found
 */
categoryRoutes.get(
  "/admin/categories/:id",
  auth.authenticateUser,
  categoryController.getCategoryById
);

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     description: Create a new category in the CMS.
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the request
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Category created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the created category
 *                       example: "category_id_123"
 *                     name:
 *                       type: string
 *                       description: The name of the created category
 *                       example: "Electronics"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the category was created
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the category was last updated
 *                       example: "2023-01-01T00:00:00.000Z"
 *       400:
 *         description: Bad Request - Validation error or missing fields
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
 *                   example: "Validation failed: Name is required"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Name must be at least 3 characters long"
 *       401:
 *         description: Unauthorized - User not authenticated
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
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - User lacks the necessary permissions
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
 *                   example: "You do not have permission to perform this action"
 */
categoryRoutes.post(
  "/admin/categories",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  categoryController.createCategoryCMS
);

/**
 * @swagger
 * /admin/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update a category by ID
 *     description: Update an existing category in the CMS by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: string
 *           example: "category_id_123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Electronics"
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: Category updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "category_id_123"
 *                     name:
 *                       type: string
 *                       example: "Updated Electronics"
 *                     created_at:
 *                       type: string
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     updated_at:
 *                       type: string
 *                       example: "2023-01-02T00:00:00.000Z"
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 */
categoryRoutes.put(
  "/admin/categories/:id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  categoryController.updateCategoryCMS
);

/**
 * @swagger
 * /admin/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category by ID
 *     description: Delete a category from the CMS by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: string
 *           example: "category_id_123"
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                   example: Category deleted successfully
 *       404:
 *         description: Category not found
 */
categoryRoutes.delete(
  "/admin/categories/:id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  categoryController.deleteCategoryCMS
);

module.exports = categoryRoutes;
