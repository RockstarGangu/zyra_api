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
userRouter.route("/addToLikedProducts").patch(verifyJWT, addToLikedProducts);
userRouter
  .route("/removeFromLikedProducts/:id")
  .patch(verifyJWT, removeFromLikedProducts);
userRouter.route("/itemsInCart").get(verifyJWT, itemsInCart);
userRouter.route("/addToCart").patch(verifyJWT, addToCart);
userRouter.route("/removeFromCart").patch(verifyJWT, removeFromCart);
userRouter.route("/getAllLikedProducts").get(verifyJWT, getAllLikedProducts);

export default userRouter;
