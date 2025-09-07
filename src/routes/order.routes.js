import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {
  cancelOrder,
  getAllOrders,
  getOrderDetails,
  makeOrder,
  updateOrderDetails,
  getOrdersByUser
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.route("/make-order").post(verifyJWT, makeOrder);
orderRouter.route("/get-order-details/:id").get(verifyJWT, getOrderDetails);
orderRouter.route("/update-order-details/:id").patch(verifyJWT, updateOrderDetails);
orderRouter.route("/cancel-order/:id").delete(verifyJWT, cancelOrder);
orderRouter.route("/get-all-orders").get(verifyJWT, getAllOrders);
orderRouter.route("/get-orders-by-user").get(verifyJWT, getOrdersByUser);

export default orderRouter;