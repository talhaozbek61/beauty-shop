import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/db-connect.js";

import productsRouter from "./router/products.js";
import authRouter from "./router/auth.js";
import cartRouter from "./router/cart.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cookieParser()); // for parsing cookies

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  connectDB(MONGO_URI);
  console.log(`Listening to http://localhost:${PORT}`);
});
