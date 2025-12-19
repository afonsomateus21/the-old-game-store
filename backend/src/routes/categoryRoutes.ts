import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createCategory, deleteCategory, getAllCategories, getCategory, getCategoryByName, updateCategory } from "../controllers/categoryController";

const router = Router();

router.post("/register", authMiddleware, createCategory);
router.get("/list", authMiddleware, getAllCategories);
router.get("/get-by-id/:id", authMiddleware, getCategory);
router.get("/get-by-name", authMiddleware, getCategoryByName);
router.put("/edit/:id", authMiddleware, updateCategory);
router.delete("/delete/:id", authMiddleware, deleteCategory);

export default router;