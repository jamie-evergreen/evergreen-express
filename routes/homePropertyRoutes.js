// routes/propertyRoutes.js
import express from "express";
const router = express.Router();
import { getProperties } from "../controllers/homePropertyController.js";
router.get("/homeProperties", getProperties);

export default router;
