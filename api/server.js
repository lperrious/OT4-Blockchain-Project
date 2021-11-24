const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const swaggerInit = require("./doc/swagger");
const swaggerUi = require("swagger-ui-express");
const connectBC = require("./connection/bc");
const Actor = require("./contracts/actor");
const Transaction = require("./contracts/transaction");
const app = express();

// Set PORT (default:8080)
const PORT = process.env.port || 8080;

// Load env var
dotenv.config({ path: ".env" });

// Connect to the Blockchain
global.web3 = connectBC();

Actor.init();
Transaction.init();

// Import routes files
const actorRouter = require("./routes/actor");
const transactionRouter = require("./routes/transaction");

// Body parser
app.use(express.json()); //to support JSON-encoded bodies

// Dev logging middleware
if (process.env.MODE === "development") app.use(morgan("dev"));

// Set static folder
// __dirname is the current directory
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/api/v1/actors", actorRouter);
app.use("/api/v1/transactions", transactionRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerInit()));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verify API's availability
 *     tags:
 *       - availability
 *     description: Check if the API is available at the moment
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/", function (req, res) {
    res.status(200);
    res.json({ message: "OT4 API is online !" });
});

//Custom error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.MODE} on port ${PORT}`);
});