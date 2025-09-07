import Order from "../models/order.model.js";

const makeOrder = async (req, res) => {
  try {
    const { orderedProducts, totalPrice, paymentMethod, orderAddress } =
      req.body;
    if (!orderedProducts || !totalPrice || !paymentMethod || !orderAdress) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    const order = await Order.create({
      orderedProducts,
      totalPrice,
      paymentMethod,
      orderAddress,
      orderedBy: req.user._id,
    });

    if (!order) {
      return res.status(400).json({ message: "Error creating order" });
    }

    return res
      .status(200)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    return res.status(500).json({ message: "Error making order" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.body();
    if (!orderId) {
      return res.status(404).json({ message: "Provide order id" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: "Error getting order" });
  }
};

const updateOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.body();

    if (!orderId) {
      return res.status(404).json({ message: "Provide order id" });
    }

    const { orderedProducts, totalPrice, paymentMethod, orderAddress } =
      req.body;
    if (!orderedProducts || !totalPrice || !paymentMethod || !orderAdress) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          orderedProducts,
          totalPrice,
          paymentMethod,
          orderAddress,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating order" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.body();
    if (!orderId) {
      return res.status(404).json({ message: "Provide order id" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error cancelling order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Error getting orders" });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(404).json({ message: "Provide user id" });
    }
    const orders = await Order.find({ orderedBy: userId });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Error getting orders" });
  }
};

export {
  makeOrder,
  getOrderDetails,
  updateOrderDetails,
  cancelOrder,
  getAllOrders,
  getOrdersByUser,
};
