import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const listProduct = async (req, res) => {
  try {
    const {
      productName,
      sku,
      productDescription,
      productImages,
      categories,
      tags,
      productMaterial,
      productSize,
      productWeight,
      pricing,
      inStock,
      isReturnable,
      ratings,
      reviews,
      isActive,
    } = req.body;

    if (
      [
        productName,
        productDescription,
        productImages,
        categories,
        tags,
        productMaterial,
        productSize,
        productWeight,
        pricing,
        inStock,
        isReturnable,
        ratings,
        reviews,
        isActive,
      ].some((field) => field?.trim() === "")
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    const existingProduct = await Product.findOne({
      sku,
    });
    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }
    const newProduct = await Product.create({
      productName,
      sku,
      productDescription,
      productImages,
      categories,
      tags,
      productMaterial,
      productSize,
      productWeight,
      pricing,
      inStock,
      isReturnable,
      ratings,
      reviews,
      isActive,
      vendor: req.user._id,
    });

    return res
      .status(200)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const productId = req.body();
    if (!productId) {
      return res.status(404).json({ message: "Provide product id" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productImages,
      categories,
      tags,
      productMaterial,
      productSize,
      productWeight,
      pricing,
      inStock,
      isReturnable,
      ratings,
      reviews,
      isActive,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productImages ||
      !categories ||
      !tags ||
      !productMaterial ||
      !productSize ||
      !productWeight ||
      !pricing ||
      !inStock ||
      !isReturnable ||
      !ratings ||
      !reviews ||
      !isActive
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await Product.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          productName,
          productDescription,
          productImages,
          categories,
          tags,
          productMaterial,
          productSize,
          productWeight,
          pricing,
          inStock,
          isReturnable,
          ratings,
          reviews,
          isActive,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({ message: "Details updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.body();

    if (!productId) {
      return res.status(404).json({ message: "Provide product id" });
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//TODO : Add filtering,sorting,pagination and search functionality

export { listProduct, getProductDetails, updateProductDetails, deleteProduct };
