import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addReview,
  deleteReview,
  getAllReviewsByProduct,
  getReview,
  updateReview,
} from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.route("/add-review").post(verifyJWT, addReview);
reviewRouter.route("/get-review/:id").get(verifyJWT, getReview);
reviewRouter.route("/update-review/:id").patch(verifyJWT, updateReview);
reviewRouter.route("/delete-review/:id").delete(verifyJWT, deleteReview);
reviewRouter
  .route("/get-all-reviews-by-product/:product")
  .get(verifyJWT, getAllReviewsByProduct);

export default reviewRouter;
