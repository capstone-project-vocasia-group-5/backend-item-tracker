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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
