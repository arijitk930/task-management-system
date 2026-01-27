import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//  Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);

// 👤 User profile
router.get("/me", verifyJWT, getCurrentUser);
router.patch("/me", verifyJWT, updateProfile);
router.patch("/change-password", verifyJWT, changePassword);

export default router;
