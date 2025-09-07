import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTHTOKEN
);

const otp = Math.floor(100000 + Math.random() * 900000);

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { mobileNumber } = req.body();

    const existingUser = await User.findOne({ mobileNumber });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    await client.messages
      .create({
        body: `Welcome to Zyra, ${otp} is your verification code.For your security, do not share this code`,
        messagingServiceSid: process.env.TWILIO_SID,
        to: `+91${mobileNumber}`,
      })
      .then(() => res.status(200).json({ message: "OTP sent successfully" }))
      .catch((error) =>
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message })
      );
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { mobileNumber, sentOtp } = req.body();

    if (!sentOtp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    if (sentOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const newUser = await User.create({
      mobileNumber,
      isMobileVerified: true,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      newUser._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User created successfully",
        accessToken,
        refreshToken,
        newUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllLikedProducts = async (req, res) => {
  try {
    const user = req.body._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedProducts = await Product.find({
      _id: { $in: user.likedProducts },
    });

    return res.status(200).json({ likedProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const itemsInCart = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemsInCart = await Product.find({
      _id: { $in: user.itemsInCart },
    });

    return res.status(200).json({ itemsInCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    const existingUser = await User.findOne({ mobileNumber });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      existingUser._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully",
        accessToken,
        refreshToken,
        existingUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken", { httpOnly: true, secure: true })
      .clearCookie("refreshToken", { httpOnly: true, secure: true })
      .json({ message: "User logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addToLikedProducts = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productId = req.params.id;

    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          likedProducts: productId,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Product added to liked products" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const removeFromLikedProducts = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productId = req.params.id;

    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        $pull: {
          likedProducts: productId,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Product removed from liked products" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productId = req.params.id;
    const { quantity } = req.body;

    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          itemsInCart: { productId, quantity },
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productId = req.params.id;

    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        $pull: {
          itemsInCart: productId,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  sendOtp,
  verifyOtp,
  getAllLikedProducts,
  addToLikedProducts,
  removeFromLikedProducts,
  itemsInCart,
  addToCart,
  removeFromCart,
  login,
  logout,
};
