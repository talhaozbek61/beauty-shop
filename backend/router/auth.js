import express from "express";

import {
  checkAuth,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signout", signOut);

export default router;
