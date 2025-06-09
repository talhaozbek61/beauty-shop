import express from "express";

import {
  checkAuth,
  login,
  logout,
  signUp,
  updatedUser,
} from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/check-auth", verifyToken, checkAuth);

router.post("/logout", logout);

router.put("/user/:id", updatedUser);

export default router;
