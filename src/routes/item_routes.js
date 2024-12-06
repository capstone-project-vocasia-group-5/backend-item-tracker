const express = require("express");
const itemRoutes = express.Router();
const itemController = require("../controllers/item_controller");
const auth = require("../middlewares/auth");
const CFG = require("../config/const");
const { uploadMultiple } = require("../middlewares/multers");

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */

// Create a new item
/**
 * @swagger
 * /items:
 *   post:
 *     tags: [Items]
 *     summary: Create a new item
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - images
 *               - type
 *               - province
 *               - city
 *               - subdistrict
 *               - village
 *               - postal_code
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 *               province:
 *                 type: string
 *               city:
 *                 type: string
 *               subdistrict:
 *                 type: string
 *               village:
 *                 type: string
 *               postal_code:
 *                 type: number
 *               phone_number:
 *                 type: string
 *                 default: null
 *     responses:
 *       201:
 *         description: Item created successfully
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
 *                   example: "Item created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "abc123"
 *                         name:
 *                           type: string
 *                           example: "Wallet"
 *                         description:
 *                           type: string
 *                           example: "Black leather wallet with multiple compartments"
 *                         matched_status:
 *                           type: boolean
 *                           example: false
 *                         images:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                         approved:
 *                           type: boolean
 *                           example: false
 *                         type:
 *                           type: string
 *                           example: "Lost"
 *                         province:
 *                           type: string
 *                           example: "Central Java"
 *                         city:
 *                           type: string
 *                           example: "Semarang"
 *                         subdistrict:
 *                           type: string
 *                           example: "Gajahmungkur"
 *                         village:
 *                           type: string
 *                           example: "Karangayu"
 *                         postal_code:
 *                           type: number
 *                           example: 50232
 *                         phone_number:
 *                           type: string
 *                           example: null
 *                         created_at:
 *                           type: string
 *                           example: "2023-08-01T00:00:00.000Z"
 *                         updated_at:
 *                           type: string
 *                           example: "2023-08-02T00:00:00.000Z"
 *         400:
 *           description: Bad Request
 *         401:
 *           description: Unauthorized
 */
itemRoutes.post(
  "/items",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  uploadMultiple,
  itemController.createItem
);

// Update an existing item
/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     tags: [Items]
 *     summary: Update an existing item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 *               province:
 *                 type: string
 *               city:
 *                 type: string
 *               subdistrict:
 *                 type: string
 *               village:
 *                 type: string
 *               postal_code:
 *                 type: number
 *               phone_number:
 *                 type: string
 *                 default: null
 *     responses:
 *       200:
 *         description: Item updated successfully
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
 *                   example: "Item updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "abc123"
 *                         name:
 *                           type: string
 *                           example: "Updated Wallet"
 *                         description:
 *                           type: string
 *                           example: "Updated description for the wallet"
 *                         matched_status:
 *                           type: boolean
 *                           example: false
 *                         images:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                         approved:
 *                           type: boolean
 *                           example: true
 *                         type:
 *                           type: string
 *                           example: "Lost"
 *                         province:
 *                           type: string
 *                           example: "Central Java"
 *                         city:
 *                           type: string
 *                           example: "Semarang"
 *                         subdistrict:
 *                           type: string
 *                           example: "Gajahmungkur"
 *                         village:
 *                           type: string
 *                           example: "Karangayu"
 *                         postal_code:
 *                           type: number
 *                           example: 50232
 *                         phone_number:
 *                           type: string
 *                           example: "+6281234567890"
 *                         created_at:
 *                           type: string
 *                           example: "2023-08-01T00:00:00.000Z"
 *                         updated_at:
 *                           type: string
 *                           example: "2023-08-02T00:00:00.000Z"
 *         400:
 *           description: Bad Request
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Item not found
 */
itemRoutes.patch(
  "/items/:id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  uploadMultiple,
  itemController.updateItem
);

// Delete an item
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     tags: [Items]
 *     summary: Delete an item by user owner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
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
 *                   example: "Item deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "abc123"
 *                         name:
 *                           type: string
 *                           example: "Wallet"
 *                         description:
 *                           type: string
 *                           example: "Black leather wallet with multiple compartments"
 *                         matched_status:
 *                           type: boolean
 *                           example: false
 *                         images:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                         approved:
 *                           type: boolean
 *                           example: false
 *                         type:
 *                           type: string
 *                           example: "Lost"
 *                         province:
 *                           type: string
 *                           example: "Central Java"
 *                         city:
 *                           type: string
 *                           example: "Semarang"
 *                         subdistrict:
 *                           type: string
 *                           example: "Gajahmungkur"
 *                         village:
 *                           type: string
 *                           example: "Karangayu"
 *                         postal_code:
 *                           type: number
 *                           example: 50232
 *                         phone_number:
 *                           type: string
 *                           example: null
 *                         created_at:
 *                           type: string
 *                           example: "2023-08-01T00:00:00.000Z"
 *                         updated_at:
 *                           type: string
 *                           example: "2023-08-02T00:00:00.000Z"
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Item not found
 */
itemRoutes.delete(
  "/items/:id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  itemController.deleteItem
);

/**
 * @swagger
 * /admin/items/{id}:
 *   delete:
 *     tags: [Items]
 *     summary: Delete an item by admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
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
 *                   example: "Item deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "abc123"
 *                         name:
 *                           type: string
 *                           example: "Wallet"
 *                         description:
 *                           type: string
 *                           example: "Black leather wallet with multiple compartments"
 *                         matched_status:
 *                           type: boolean
 *                           example: false
 *                         images:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                         approved:
 *                           type: boolean
 *                           example: false
 *                         type:
 *                           type: string
 *                           example: "Lost"
 *                         province:
 *                           type: string
 *                           example: "Central Java"
 *                         city:
 *                           type: string
 *                           example: "Semarang"
 *                         subdistrict:
 *                           type: string
 *                           example: "Gajahmungkur"
 *                         village:
 *                           type: string
 *                           example: "Karangayu"
 *                         postal_code:
 *                           type: number
 *                           example: 50232
 *                         phone_number:
 *                           type: string
 *                           example: null
 *                         created_at:
 *                           type: string
 *                           example: "2023-08-01T00:00:00.000Z"
 *                         updated_at:
 *                           type: string
 *                           example: "2023-08-02T00:00:00.000Z"
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Item not found
 */
itemRoutes.delete(
  "/admin/items/:id",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  itemController.deleteItem
);

/**
 * @swagger
 * /items/user:
 *   get:
 *     tags: [Items]
 *     summary: Get items by user owner
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved items for the user
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
 *                   example: "Items retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "item123"
 *                           name:
 *                             type: string
 *                             example: "Wallet"
 *                           description:
 *                             type: string
 *                             example: "Black leather wallet with multiple compartments"
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["https://example.com/image1.jpg"]
 *                           type:
 *                             type: string
 *                             example: "Lost"
 *                           province:
 *                             type: string
 *                             example: "Central Java"
 *                           city:
 *                             type: string
 *                             example: "Semarang"
 *                           subdistrict:
 *                             type: string
 *                             example: "Gajahmungkur"
 *                           village:
 *                             type: string
 *                             example: "Karangayu"
 *                           postal_code:
 *                             type: number
 *                             example: 50232
 *                           phone_number:
 *                             type: string
 *                             example: "+6281234567890"
 *                           created_at:
 *                             type: string
 *                             example: "2023-06-02T00:00:00.000Z"
 *                           updated_at:
 *                             type: string
 *                             example: "2023-06-02T00:00:00.000Z"
 *       400:
 *         description: Bad Request - Invalid userId
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
 *                   example: "Invalid userId"
 *       401:
 *         description: Unauthorized - User is not authenticated
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
 *       404:
 *         description: Not Found - No items found for the given userId
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
 *                   example: "No items found for the given userId"
 */
itemRoutes.get(
  "/items/user",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.USER),
  itemController.getAllItems
);

// Get item by ID
/**
 * @swagger
 * /items/{id}:
 *   get:
 *     tags: [Items]
 *     summary: Get an item by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to retrieve
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       200:
 *         description: Item retrieved successfully
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
 *                   example: "Item retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "abc123"
 *                         name:
 *                           type: string
 *                           example: "Wallet"
 *                         description:
 *                           type: string
 *                           example: "Black leather wallet with multiple compartments"
 *                         matched_status:
 *                           type: boolean
 *                           example: false
 *                         images:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                         approved:
 *                           type: boolean
 *                           example: false
 *                         type:
 *                           type: string
 *                           example: "Lost"
 *                         province:
 *                           type: string
 *                           example: "Central Java"
 *                         city:
 *                           type: string
 *                           example: "Semarang"
 *                         subdistrict:
 *                           type: string
 *                           example: "Gajahmungkur"
 *                         village:
 *                           type: string
 *                           example: "Karangayu"
 *                         postal_code:
 *                           type: number
 *                           example: 50232
 *                         phone_number:
 *                           type: string
 *                           example: null
 *                         created_at:
 *                           type: string
 *                           example: "2023-08-01T00:00:00.000Z"
 *                         updated_at:
 *                           type: string
 *                           example: "2023-08-02T00:00:00.000Z"
 *       404:
 *         description: Item not found
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
 *                   example: "Item not found"
 *       401:
 *         description: Unauthorized - User is not authenticated
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
itemRoutes.get("/items/:id", auth.authenticateUser, itemController.getItemById);

// Get all items with optional filters
/**
 * @swagger
 * /items:
 *   get:
 *     tags: [Items]
 *     summary: Get all items with optional filters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of items per page for pagination
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: "Wallet"
 *         description: Filter items by name
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *           example: "Black leather wallet"
 *         description: Filter items by description
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: "Lost"
 *         description: Filter items by type (e.g., "Lost", "Found")
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *           example: "Central Java"
 *         description: Filter items by province
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           example: "Semarang"
 *         description: Filter items by city
 *       - in: query
 *         name: subdistrict
 *         schema:
 *           type: string
 *           example: "Gajahmungkur"
 *         description: Filter items by subdistrict
 *       - in: query
 *         name: village
 *         schema:
 *           type: string
 *           example: "Karangayu"
 *         description: Filter items by village
 *       - in: query
 *         name: postal_code
 *         schema:
 *           type: number
 *           example: 50232
 *         description: Filter items by postal code
 *     responses:
 *       200:
 *         description: Successfully retrieved all items with filters applied
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
 *                   example: "Items retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "abc123"
 *                           name:
 *                             type: string
 *                             example: "Wallet"
 *                           description:
 *                             type: string
 *                             example: "Black leather wallet with multiple compartments"
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                           type:
 *                             type: string
 *                             example: "Lost"
 *                           province:
 *                             type: string
 *                             example: "Central Java"
 *                           city:
 *                             type: string
 *                             example: "Semarang"
 *                           subdistrict:
 *                             type: string
 *                             example: "Gajahmungkur"
 *                           village:
 *                             type: string
 *                             example: "Karangayu"
 *                           postal_code:
 *                             type: number
 *                             example: 50232
 *                           phone_number:
 *                             type: string
 *                             example: "+6281234567890"
 *                           created_at:
 *                             type: string
 *                             example: "2023-06-01T00:00:00.000Z"
 *                           updated_at:
 *                             type: string
 *                             example: "2023-06-02T00:00:00.000Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalItems:
 *                           type: integer
 *                           example: 100
 *                         totalPages:
 *                           type: integer
 *                           example: 10
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *       401:
 *         description: Unauthorized - User is not authenticated
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
itemRoutes.get("/items", itemController.getAllItems);

// Get all items with optional filters
/**
 * @swagger
 * /admin/items:
 *   get:
 *     tags: [Items]
 *     summary: Get all items with optional filters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of items per page for pagination
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: "Wallet"
 *         description: Filter items by name
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *           example: "Black leather wallet"
 *         description: Filter items by description
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: "Lost"
 *         description: Filter items by type (e.g., "Lost", "Found")
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *           example: "Central Java"
 *         description: Filter items by province
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           example: "Semarang"
 *         description: Filter items by city
 *       - in: query
 *         name: subdistrict
 *         schema:
 *           type: string
 *           example: "Gajahmungkur"
 *         description: Filter items by subdistrict
 *       - in: query
 *         name: village
 *         schema:
 *           type: string
 *           example: "Karangayu"
 *         description: Filter items by village
 *       - in: query
 *         name: postal_code
 *         schema:
 *           type: number
 *           example: 50232
 *         description: Filter items by postal code
 *     responses:
 *       200:
 *         description: Successfully retrieved all items with filters applied
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
 *                   example: "Items retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "abc123"
 *                           name:
 *                             type: string
 *                             example: "Wallet"
 *                           description:
 *                             type: string
 *                             example: "Black leather wallet with multiple compartments"
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                           type:
 *                             type: string
 *                             example: "Lost"
 *                           province:
 *                             type: string
 *                             example: "Central Java"
 *                           city:
 *                             type: string
 *                             example: "Semarang"
 *                           subdistrict:
 *                             type: string
 *                             example: "Gajahmungkur"
 *                           village:
 *                             type: string
 *                             example: "Karangayu"
 *                           postal_code:
 *                             type: number
 *                             example: 50232
 *                           phone_number:
 *                             type: string
 *                             example: "+6281234567890"
 *                           created_at:
 *                             type: string
 *                             example: "2023-06-01T00:00:00.000Z"
 *                           updated_at:
 *                             type: string
 *                             example: "2023-06-02T00:00:00.000Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalItems:
 *                           type: integer
 *                           example: 100
 *                         totalPages:
 *                           type: integer
 *                           example: 10
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *       401:
 *         description: Unauthorized - User is not authenticated
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
itemRoutes.get(
  "/admin/items",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  itemController.getAllItems
);

/**
 * @swagger
 * /items/total:
 *   get:
 *     tags: [Items]
 *     summary: Get the total count of items
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the total count of items
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
 *                   example: "Total items count retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 150
 *       401:
 *         description: Unauthorized - User is not authenticated
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
itemRoutes.get(
  "/admin/items/total",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  itemController.getTotalItem
);

/**
 * @swagger
 * /admin/items/{id}/approval:
 *   patch:
 *     tags: [Items]
 *     summary: Approve an item via CMS
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "item123"
 *         description: ID of the item to be approved
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               messages:
 *                 type: string
 *                 description: Reason for approveing the item or some advisements.
 *                 example: "Look good but you can make it better with some changes, for example change the description of the item, make it more attractive."
 *     responses:
 *       200:
 *         description: Successfully approved
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
 *                   example: "Successfully approved"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "item123"
 *                     messages:
 *                       type: string
 *                       example: "Look good but you can make it better with some changes, for example change the description of the item, make it more attractive."
 *       401:
 *         description: Unauthorized - User is not authenticated
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
 *       404:
 *         description: Not Found - Item not found
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
 *                   example: "Item not found"
 */
itemRoutes.patch(
  "/admin/items/:id/approval",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  itemController.approveItemCMS
);

/**
 * @swagger
 * /admin/items/{id}/reject:
 *   patch:
 *     tags: [Items]
 *     summary: Reject an item via CMS
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "item123"
 *         description: ID of the item to be approved or rejected
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               messages:
 *                 type: string
 *                 description: Reason for rejecting the item.
 *                 example: "The item does not meet the quality standards."
 *     responses:
 *       200:
 *         description: Successfully rejected
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
 *                   example: "Successfully rejected"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "item123"
 *                     messages:
 *                       type: string
 *                       example: "The item does not meet the quality standards."
 *       400:
 *         description: Bad Request - Invalid input or missing fields
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
 *                   example: "Invalid input data"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: "messages"
 *                       message:
 *                         type: string
 *                         example: "The 'messages' field is required"
 *       401:
 *         description: Unauthorized - User is not authenticated
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
 *       404:
 *         description: Not Found - Item not found
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
 *                   example: "Item not found"
 */
itemRoutes.patch(
  "/admin/items/:id/reject",
  auth.authenticateUser,
  auth.authorizeRoles(CFG.ROLES.ADMIN),
  itemController.rejectItemCMS
);

module.exports = itemRoutes;
