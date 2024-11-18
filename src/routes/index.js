const express = require("express");
const testRoutes = require("./test_routes");

const routes = express.Router();

// test routes
routes.use(testRoutes);

module.exports = routes;
