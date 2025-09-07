import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.route("/create-category").post(verifyJWT, createCategory);
categoryRouter.route("/get-category/:id").get(verifyJWT, getCategory);
categoryRouter.route("/update-category/:id").patch(verifyJWT, updateCategory);
categoryRouter.route("/delete-category/:id").delete(verifyJWT, deleteCategory);
categoryRouter.route("/get-all-categories").get(verifyJWT, getAllCategories);

export default categoryRouter;
