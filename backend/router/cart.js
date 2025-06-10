import express from "express";
import {
  getCartByUserId,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cart-controller.js";

const router = express.Router();

router.delete("/clear/:userId", clearCart); // DELETE /cart/clear/USERID
router.delete("/item/:userId/:productId", removeFromCart); // DELETE /cart/item/USERID/PRODUCTID
router.post("/", addToCart); // POST /cart
router.get("/:userId", getCartByUserId); // GET /cart/USERID

export default router;
