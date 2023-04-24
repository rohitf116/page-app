"use strict";
const express = require("express");
const cors = require("cors");
const dotevn = require("dotenv");

const morgan = require("morgan");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const app = express();
dotevn.config();
app.use(express.json());
app.use(cors());
// app.use(cookieParser());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
const port = 3001;
const page = require("./routes/PageRoutes");
// const User = require("./routes/UserRoutes");
// const Cart = require("./routes/CartRoutes");
app.use("/api/v1/page", page);
// app.use("/api/v1/user", User);
// app.use("/api/v1/cart", Cart);

app.listen(port, () => console.log(`Running on port: ${port}`));