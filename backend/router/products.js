import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updatedProduct,
} from "../controllers/product-controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductsById);

router.post("/", createProduct);

router.put("/:id", updatedProduct);

router.delete("/:id", deleteProduct);

export default router;
