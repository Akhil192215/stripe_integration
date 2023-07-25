const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");

app.use(express.json());
app.use(cors());

app.use(router);
app.listen(process.env.PORT || 4000, () => {
  console.log("server connected");
});
