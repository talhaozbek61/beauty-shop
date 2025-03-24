import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db-connect.js";
import productsRouter from "./router/products.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB(MONGO_URI);
  console.log(`Listening to http://localhost:${PORT}`);
});
