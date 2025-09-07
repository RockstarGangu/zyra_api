import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteVendor,
  getVendorDetails,
  listCompany,
  updateDetails,
} from "../controllers/vendor.controller.js";

const vendorRouter = express.Router();

vendorRouter.route("list-a-company").post(verifyJWT, listCompany);
vendorRouter.route("update-a-company/:id").patch(verifyJWT, updateDetails);
vendorRouter.route("get-vendor-details").get(verifyJWT, getVendorDetails);
vendorRouter.route("delete-a-vendor").delete(verifyJWT, deleteVendor);

export default vendorRouter;
