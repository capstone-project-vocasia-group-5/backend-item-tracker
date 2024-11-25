const express = require("express");
const claimRoutes = express.Router();
const claimController = require("../controllers/claim_controller");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Claims
 *   description: API for managing claims
 */

/**
 * @swagger
 * /claims:
 *   post:
 *     tags: [Claims]
 *     summary: Create a new claim
 *     description: Create a new claim for a specific item, attaching user details, approval status, images, and claim text.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - to_user_id
 *               - item_id
 *               - images
 *               - claim_text
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "60b8c4d2f1f9a5e9a73c1e4b"
 *               to_user_id:
 *                 type: string
 *                 example: "60b8c4d2f1f9a5e9a73c1e4c"
 *               item_id:
 *                 type: string
 *                 example: "60b8c4d2f1f9a5e9a73c1e4d"
 *               is_approved:
 *                 type: boolean
 *                 example: false
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "https://example.com/image1.jpg"
 *               claim_text:
 *                 type: string
 *                 example: "The item was damaged during delivery"
 *     responses:
 *       201:
 *         description: Claim created successfully
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
 *                   example: "Claim created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "claim_id_123"
 *                     user_id:
 *                       type: string
 *                       example: "60b8c4d2f1f9a5e9a73c1e4b"
 *                     to_user_id:
 *                       type: string
 *                       example: "60b8c4d2f1f9a5e9a73c1e4c"
 *                     item_id:
 *                       type: string
 *                       example: "60b8c4d2f1f9a5e9a73c1e4d"
 *                     is_approved:
 *                       type: boolean
 *                       example: false
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/image1.jpg"
 *                     claim_text:
 *                       type: string
 *                       example: "The item was damaged during delivery"
 *       400:
 *         description: Invalid input
 */
claimRoutes.post("/claims", auth.authenticateUser, claimController.createClaim);

/**
 * @swagger
 * /claims/{id}:
 *   put:
 *     tags: [Claims]
 *     summary: Update an existing claim by ID
 *     description: Update the details of an existing claim, including claim status, images, and claim text.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The claim ID
 *         schema:
 *           type: string
 *           example: "claim_id_123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_approved:
 *                 type: boolean
 *                 example: true
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "https://example.com/image2.jpg"
 *               claim_text:
 *                 type: string
 *                 example: "The item was repaired and returned"
 *     responses:
 *       200:
 *         description: Claim updated successfully
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
 *                   example: "Claim updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "claim_id_123"
 *                     is_approved:
 *                       type: boolean
 *                       example: true
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/image2.jpg"
 *                     claim_text:
 *                       type: string
 *                       example: "The item was repaired and returned"
 *       404:
 *         description: Claim not found
 *       400:
 *         description: Invalid input
 */
claimRoutes.put(
  "/claims/:id",
  auth.authenticateUser,
  claimController.updateClaim
);

/**
 * @swagger
 * /claims/{id}:
 *   delete:
 *     tags: [Claims]
 *     summary: Delete a claim by ID
 *     description: Delete a claim based on its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The claim ID
 *         schema:
 *           type: string
 *           example: "claim_id_123"
 *     responses:
 *       200:
 *         description: Claim deleted successfully
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
 *                   example: "Claim deleted successfully"
 *       404:
 *         description: Claim not found
 */
claimRoutes.delete(
  "/claims/:id",
  auth.authenticateUser,
  claimController.deleteClaim
);

/**
 * @swagger
 * /claims/{id}:
 *   get:
 *     tags: [Claims]
 *     summary: Get a claim by ID
 *     description: Retrieve a claim by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The claim ID
 *         schema:
 *           type: string
 *           example: "claim_id_123"
 *     responses:
 *       200:
 *         description: A single claim object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "claim_id_123"
 *                 user_id:
 *                   type: string
 *                   example: "60b8c4d2f1f9a5e9a73c1e4b"
 *                 to_user_id:
 *                   type: string
 *                   example: "60b8c4d2f1f9a5e9a73c1e4c"
 *                 item_id:
 *                   type: string
 *                   example: "60b8c4d2f1f9a5e9a73c1e4d"
 *                 is_approved:
 *                   type: boolean
 *                   example: false
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://example.com/image1.jpg"
 *                 claim_text:
 *                   type: string
 *                   example: "The item was damaged during delivery"
 *       404:
 *         description: Claim not found
 */
claimRoutes.get(
  "/claims/:id",
  auth.authenticateUser,
  claimController.getClaimById
);

/**
 * @swagger
 * /claims:
 *   get:
 *     tags: [Claims]
 *     summary: Get all claims
 *     description: Retrieve a list of all claims in the system.
 *     responses:
 *       200:
 *         description: List of all claims
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "claim_id_123"
 *                   user_id:
 *                     type: string
 *                     example: "60b8c4d2f1f9a5e9a73c1e4b"
 *                   to_user_id:
 *                     type: string
 *                     example: "60b8c4d2f1f9a5e9a73c1e4c"
 *                   item_id:
 *                     type: string
 *                     example: "60b8c4d2f1f9a5e9a73c1e4d"
 *                   is_approved:
 *                     type: boolean
 *                     example: false
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "https://example.com/image1.jpg"
 *                   claim_text:
 *                     type: string
 *                     example: "The item was damaged during delivery"
 */
claimRoutes.get(
  "/claims/",
  auth.authenticateUser,
  claimController.getAllClaims
);

module.exports = claimRoutes;
