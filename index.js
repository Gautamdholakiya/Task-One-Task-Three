const { json } = require("express");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");

const app = express();

const userApi = require("./Api/user");
const connectDb = require("./ConnectDb");

const port = 3000;

app.use(express.json());

app.use("/User", userApi.router);
app.listen(port, () => {
  // console.log(`SucessFully Listen at ${port}`);
});

connectDb();
