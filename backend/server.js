import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db-connect.js";

import productsRouter from "./router/products.js";
import authRouter from "./router/auth.js";
import cartRouter from "./router/cart.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://beauty-shop-v0-2.onrender.com", // production
];

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cookieParser()); // for parsing cookies

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

const __dirname = path.resolve();

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
