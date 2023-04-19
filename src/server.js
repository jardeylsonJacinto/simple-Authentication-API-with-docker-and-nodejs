const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/docker-node-app"
    );
    console.log("MongoDB connected successfully");
  }catch(err) {
    console.error(err);
  }
};

connectDB();

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});