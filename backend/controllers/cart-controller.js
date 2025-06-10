import Cart from "../models/cart-model.js";
import Product from "../models/products-model.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId)
    return res.status(400).json({
      success: false,
      message: `Incomplete information userid: ${userId}, productId: ${productId}`,
    });

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [{ productId }] });
  } else {
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId });
    }
    await cart.save();
  }

  res.status(201).json({ success: true, message: "Added Cart", data: cart });
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  const cart = await Cart.findOne({ userId });

  if (!cart)
    return res.status(404).json({ success: false, message: "Cart not found" });

  cart.items = cart.items.filter((item) => !item.productId.equals(productId));

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product removed from cart",
    data: cart.items,
  });
};

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "User ID required" });

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(200).json({ success: true, data: [] });

  const productIds = cart.items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  const merged = cart.items
    .map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId.toString()
      );
      if (!product) return null;
      return {
        ...product.toObject(),
        quantity: item.quantity,
        totalPrice: product.price * item.quantity,
      };
    })
    .filter(Boolean);

  res.status(200).json({ success: true, data: merged });
};

export const clearCart = async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (!cart)
    return res.status(404).json({ success: false, message: "No basket found" });

  cart.items = [];
  await cart.save();

  res.status(200).json({ success: true, message: "Basket cleared" });
};
