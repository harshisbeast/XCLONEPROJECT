// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import { v2 as cloudinary } from "cloudinary";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";
// import notificationRoutes from "./routes/notification.route.js";

// import connectMongoDB from "./db/connectMongoDB.js";

// dotenv.config();

// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// app.use(express.json({ limit: "5mb" })); // to parse req.body
// // limit shouldn't be too high to prevent DOS
// app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

// app.use(cookieParser());
// console.log('MONGO_URI:', process.env.MONGO_URI);

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/notifications", notificationRoutes);

// if (process.env.NODE_ENV === "development") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`);
// 	connectMongoDB();
// });




import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

// Initialize environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware to parse incoming JSON data and URL-encoded data
app.use(express.json({ limit: "5mb" }));  // Limit body size to prevent DOS attacks
app.use(express.urlencoded({ extended: true }));  // Parse form data (URL encoded)

// Middleware for cookies
app.use(cookieParser());

// Log Mongo URI for debugging
console.log('MONGO_URI:', process.env.MONGO_URI);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Serve frontend assets during development
if (process.env.NODE_ENV === "development") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start the server and connect to MongoDB
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});
