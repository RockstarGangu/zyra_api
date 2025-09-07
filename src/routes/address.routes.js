import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.route("/add-address").post(verifyJWT, addAddress);
addressRouter.route("/get-address/:id").get(verifyJWT, getAddress);
addressRouter.route("/update-address/:id").patch(verifyJWT, updateAddress);
addressRouter.route("/delete-address/:id").delete(verifyJWT, deleteAddress);

export default addressRouter;