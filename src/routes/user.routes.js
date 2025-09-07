import express from "express";
import {
  addToCart,
  addToLikedProducts,
  getAllLikedProducts,
  itemsInCart,
  login,
  logout,
  removeFromCart,
  removeFromLikedProducts,
  sendOtp,
  verifyOtp,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/sendotp").post(sendOtp);
userRouter.route("/verifyotp").post(verifyOtp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(verifyJWT, logout);
userRouter.route("/addToLikedProducts").post(verifyJWT, addToLikedProducts);
userRouter
  .route("/removeFromLikedProducts")
  .post(verifyJWT, removeFromLikedProducts);
userRouter.route("/itemsInCart").post(verifyJWT, itemsInCart);
userRouter.route("/addToCart").post(verifyJWT, addToCart);
userRouter.route("/removeFromCart").post(verifyJWT, removeFromCart);
userRouter.route("/getAllLikedProducts").post(verifyJWT, getAllLikedProducts);

export default userRouter;
