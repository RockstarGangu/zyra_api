import Category from "../models/category.model.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const productId = req.params.id;
    if (!name || !productId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newCategory = await Category.create({ name, products: productId });
    return res
      .status(200)
      .json({ message: "Category created successfully", newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error creating category" });
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(404).json({ message: "Provide category id" });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ message: "Error getting category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(404).json({ message: "Provide category id" });
    }
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(404).json({ message: "Provide category id" });
    }
    await Category.findByIdAndDelete(categoryId);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Error getting categories" });
  }
};

export {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
