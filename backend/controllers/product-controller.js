import mongoose from "mongoose";

import Product from "../models/products-model.js";

import { categories } from "../../shared/constants/categories.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error in fetching product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });

  try {
    const products = await Product.findById(id);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error in fetching product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const products = await Product.find({ userId });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error fetching user products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (
    !product.name ||
    !product.category ||
    !product.desc ||
    !product.price ||
    !product.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const allowedValues = categories.map((cat) => cat.value);

  if (!allowedValues.includes(product.category)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category selected." });
  }

  if (!product.userId) {
    return res.status(400).json({ success: false, message: "Please login." });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product added", data: newProduct });
  } catch (error) {
    console.log(`Error in create product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });

  if (!product.name || !product.desc || !product.price || !product.image)
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, message: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log(`Error in deleting product: ${error.message}`);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};
