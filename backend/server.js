import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db-connect.js";
import productsRouter from "./router/products.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  connectDB(MONGO_URI);
  console.log(`Listening to http://localhost:${PORT}`);
});
