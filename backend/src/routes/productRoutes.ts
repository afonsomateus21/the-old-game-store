import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController";

const router = Router();

router.post("/register", authMiddleware, createProduct);
router.get("/list", getAllProducts);
router.get("/get-by-id/:id", authMiddleware, getProduct);
router.put("/edit/:id", authMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);

export default router;