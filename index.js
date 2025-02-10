const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();
const cors = require("cors");
const { dataBase } = require("./config/dataBase/DataBase.js");
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

app.listen(3001, async () => {
  console.log("Server is running on port 3000");
  await dataBase.connect();
});
