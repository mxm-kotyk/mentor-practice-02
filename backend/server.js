const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
const express = require("express");
require("colors");
require("dotenv").config({ path: configPath });
const connectDb = require("../config/connectDb");
const notFoundUrl = require("./middlewares/notFoundUrl");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/v1", require("./routes/catsRoutes"));

const { PORT } = process.env;

app.use(notFoundUrl);

app.use(errorHandler);

connectDb();

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`.italic.green.bold);
});
