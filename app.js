import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import homePropertyRoutes from "./routes/homePropertyRoutes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Routes
app.use("/users", userRoutes);
app.use("/api", homePropertyRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
