import { Router } from "express";
import { createUser, deleteUser, getProfile, login, updateUser } from "../controllers/userControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update/:id", authMiddleware, updateUser);
router.delete("/profile/delete/:id", authMiddleware, deleteUser);

export default router;