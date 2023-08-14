import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

const PORT = process.env.PORT;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDb is connected....");
  } catch (e) {
    console.log(e);
  }
};

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join("../front", "dist")));

app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);

app.get("*", (req, res) => {
  const PathName = path.resolve("../front", "dist", "index.html");

  res.sendFile(PathName);
});

app.listen(PORT || 8080, () => {
  connect();
  console.log("Server is running at 8080");
});
