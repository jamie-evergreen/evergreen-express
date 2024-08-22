// routes/propertyRoutes.js
import express from "express";
const router = express.Router();
import { getProperties } from "../controllers/homePropertyController.js";
router.get("/properties", getProperties);

export default router;
