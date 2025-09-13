import express from "express";

import {
  listProduct,
  getProductDetails,
  updateProductDetails,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.route("/list-a-product").post(verifyJWT, listProduct);
productRouter.route("/get-a-product/:id").get(verifyJWT, getProductDetails);
productRouter
  .route("/update-a-product/:id")
  .patch(verifyJWT, updateProductDetails);
productRouter.route("/delete-a-product/:id").delete(verifyJWT, deleteProduct);
productRouter.route("/get-all-products").get(verifyJWT, getAllProducts);

export default productRouter;
