import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// Get the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//Routes with Files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Retrieve the port from environment variables or default to 6001
const PORT = process.env.PORT || 6001;

// Log MongoDB URL for debugging
console.log("MongoDB URL:", process.env.MONGO_URL);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Add Data only one time Ole lol
    // Check and insert users if they don't exist
    const existingUsers = await User.find({
      email: { $in: users.map((user) => user.email) },
    });
    const existingUserEmails = new Set(existingUsers.map((user) => user.email));
    const newUsers = users.filter(
      (user) => !existingUserEmails.has(user.email)
    );
    if (newUsers.length > 0) {
      await User.insertMany(newUsers);
      console.log("Inserted new users");
    } else {
      console.log("No new users to insert");
    }

    // Check and insert posts if they don't exist
    const existingPosts = await Post.find({
      _id: { $in: posts.map((post) => post._id) },
    });
    const existingPostIds = new Set(
      existingPosts.map((post) => post._id.toString())
    );
    const newPosts = posts.filter(
      (post) => !existingPostIds.has(post._id.toString())
    );
    if (newPosts.length > 0) {
      await Post.insertMany(newPosts);
      console.log("Inserted new posts");
    } else {
      console.log("No new posts to insert");
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
