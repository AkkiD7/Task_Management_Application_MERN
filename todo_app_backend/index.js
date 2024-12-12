const express = require("express");
const cors = require("cors");
const { swaggerUi, swaggerSpec } = require("./config/swagger.js");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todos");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6000;
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome To The Todo Task");
});
app.use("/todos", todoRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
