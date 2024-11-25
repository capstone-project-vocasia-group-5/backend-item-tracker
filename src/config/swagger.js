const swaggerJsdoc = require("swagger-jsdoc");
const { port } = require("../config/config");
const path = require("path");
const { required } = require("joi");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Item Tracker API",
      version: "1.0.0",
      description: "Documentation for the Item Tracker API",
      contact: {
        name: "Item Tracker Team",
        email: "itemtracker@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            image_url: { type: "string", format: "uri" },
            role: { type: "string" },
            phone_number: { type: "string" },
            is_verified: { type: "boolean" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        UserInputSignUp: {
          type: "object",
          required: ["name", "username", "email", "password", "phone_number"],
          properties: {
            name: { type: "string", example: "Suga Kim" },
            username: { type: "string", example: "suga" },
            email: { type: "string", example: "suga@example.com" },
            password: { type: "string", example: "your_password" },
            phone_number: { type: "string", example: "088181818181" },
          },
        },
        UserInputUpdate: {
          type: "object",
          properties: {
            name: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            image_url: { type: "string", format: "uri" },
            phone_number: { type: "string" },
          },
        },
      },
    },
  },
  //   apis: ["../routes/*.js"],
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
