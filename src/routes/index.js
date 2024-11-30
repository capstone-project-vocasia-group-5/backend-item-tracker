const express = require("express");
const testRoutes = require("./test_routes");
const userRoutes = require("./user_routes");
const categoryRoutes = require("./category_routes");
const claimRoutes = require("./claim_routes");
const donationRoutes = require("./donation_routes");
const notificationRoutes = require("./notification_routes");
const authRoutes = require("./auth_routes");
const commentRoutes = require("./comment_routes");
const itemRoutes = require("./item_routes");

const routes = express.Router();

// test routes
routes.use(testRoutes);

// user routes
routes.use(userRoutes);

// category routes
routes.use(categoryRoutes);

// claim routes
routes.use(claimRoutes);

// donation routes
routes.use(donationRoutes);

// notification routes
routes.use(notificationRoutes);

// auth routes
routes.use(authRoutes);

// comment routes
routes.use(commentRoutes);

// item routes
routes.use(itemRoutes);

module.exports = routes;
