import express from "express";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

export default app;