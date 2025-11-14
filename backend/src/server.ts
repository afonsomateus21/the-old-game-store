import app from "./app";
import { Database } from "./db/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

Database.initialize()
  .then(() => {
    console.log("📦 Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error initializing database:", err);
  });