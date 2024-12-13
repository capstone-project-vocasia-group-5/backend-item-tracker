const express = require("express");
const routes = require("./routes");
const connectDB = require("./config/mongodb");
const app = express();
const notFoundMiddleware = require("./middlewares/not_found");
const handleErrorMiddleware = require("./middlewares/handler_error");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const morgan = require("morgan");
const { isProduction } = require("./config/config");
const { port } = require("./config/config");

connectDB();

app.use(morgan(isProduction === "true" ? "combined" : "dev"));

app.use(cors());

app.use(express.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);

app.use("/", (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Item Tracker API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: black;
            color: white;
            text-align: center;
          }
          h1 {
            font-size: 2.5rem;
            color: white;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
          }
          a {
            color: #007BFF;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
          iframe {
            margin-top: 20px;
            border: none;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to ITEM TRACKER API</h1>
        <p>
          If you want to see the API documentation, please click this link: 
          <br/>
          <a href="https://documenter.getpostman.com/view/32137512/2sAYBViXZJ" target="_blank">Postman Documentation</a>
          <br/>
          <a href="/api-docs" target="_blank">Swagger Documentation</a>
        </p>
        <p>Please watch the video below for your reference >_< Sasageyo! </p>
        <!-- Embedded YouTube Video -->
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/HQ2VhX_CeKU?autoplay=1&rel=0" 
          title="YouTube Video" 
          allow="autoplay; encrypted-media" 
          allowfullscreen>
        </iframe>
      </body>
    </html>
  `);
});

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
