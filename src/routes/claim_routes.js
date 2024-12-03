const express = require("express");
const claimRoutes = express.Router();
const claimController = require("../controllers/claim_controller");
const auth = require("../middlewares/auth");
const { uploadMultiple } = require("../middlewares/multers");

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
 *     security:
 *       - bearerAuth: []
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
claimRoutes.post(
  "/claims",
  auth.authenticateUser,
  uploadMultiple,
  claimController.createClaim
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
 *     security:
 *       - bearerAuth: []
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
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of claims to retrieve per page.
 *       - in: query
 *         name: own
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Whether to retrieve claims for the current user.
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /claims/{claim_id}/approve:
 *   put:
 *     tags: [Claims]
 *     summary: Approve a claim
 *     description: Approve a specific claim for a user by ID.
 *     parameters:
 *       - in: path
 *         name: claim_id
 *         required: true
 *         description: The ID of the claim to approve.
 *         schema:
 *           type: string
 *           example: "claim_id_123"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully approved the claim.
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
 *                   example: Successfully approved the claim.
 *                 data:
 *                   type: object
 *                   properties:
 *                     claim:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b234"
 *                         to_user_id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b456"
 *                         user_id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b789"
 *                         approved:
 *                           type: boolean
 *                           example: true
 *                         deleted_at:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *       404:
 *         description: Claim not found.
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
 *                   example: Claim not found.
 *                 error:
 *                   type: string
 *                   example: Claims is not found.
 *       401:
 *         description: Unauthorized.
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
 *                   example: Unauthorized access.
 *       500:
 *         description: Internal Server Error.
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
 *                   example: Something went wrong.
 */
claimRoutes.put(
  "/claims/:claim_id/approve",
  auth.authenticateUser,
  claimController.approveClaim
);

/**
 * @swagger
 * /claims/{claim_id}/reject:
 *   put:
 *     tags: [Claims]
 *     summary: Reject a claim
 *     description: Reject a specific claim for a user by ID.
 *     parameters:
 *       - in: path
 *         name: claim_id
 *         required: true
 *         description: The ID of the claim to reject.
 *         schema:
 *           type: string
 *           example: "claim_id_123"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully rejected the claim.
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
 *                   example: Successfully rejected the claim.
 *                 data:
 *                   type: object
 *                   properties:
 *                     claim:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b234"
 *                         to_user_id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b456"
 *                         user_id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b789"
 *                         approved:
 *                           type: boolean
 *                           example: false
 *                         deleted_at:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *       404:
 *         description: Claim not found.
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
 *                   example: Claim not found.
 *                 error:
 *                   type: string
 *                   example: Claims is not found.
 *       401:
 *         description: Unauthorized.
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
 *                   example: Unauthorized access.
 *       500:
 *         description: Internal Server Error.
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
 *                   example: Something went wrong.
 */
claimRoutes.put(
  "/claims/:claim_id/reject",
  auth.authenticateUser,
  claimController.rejectClaim
);

/**
 * @swagger
 * /claims/{claim_id}/delete:
 *   put:
 *     tags: [Claims]
 *     summary: Soft delete a claim
 *     description: Mark a specific claim as deleted by setting the `deleted_at` field.
 *     parameters:
 *       - in: path
 *         name: claim_id
 *         required: true
 *         description: The ID of the claim to delete.
 *         schema:
 *           type: string
 *           example: "claim_id_123"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted the claim.
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
 *                   example: Successfully deleted the claim.
 *                 data:
 *                   type: object
 *                   properties:
 *                     claim:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b234"
 *                         user_id:
 *                           type: string
 *                           example: "64e23b9a10fc024b2e18b789"
 *                         deleted_at:
 *                           type: string
 *                           example: "2024-12-02T10:00:00.000Z"
 *       404:
 *         description: Claim not found.
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
 *                   example: Claim not found.
 *                 error:
 *                   type: string
 *                   example: Claims is not found.
 *       401:
 *         description: Unauthorized.
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
 *                   example: Unauthorized access.
 *       500:
 *         description: Internal Server Error.
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
 *                   example: Something went wrong.
 */
claimRoutes.put(
  "/claims/:claim_id/delete",
  auth.authenticateUser,
  claimController.deleteClaim
);

module.exports = claimRoutes;
