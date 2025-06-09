import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  getProductsByUserId,
  updatedProduct,
} from "../controllers/product-controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductsById);

router.get("/user/:userId", getProductsByUserId);

router.post("/", createProduct);

router.put("/:id", updatedProduct);

router.delete("/:id", deleteProduct);

export default router;
