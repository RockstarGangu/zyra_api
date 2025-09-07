import Review from "../models/review.model.js";

const addReview = async (req, res) => {
  try {
    const { images, rating, review, productId } = req.body;
    const existingReview = await findById({ images });
    if (existingReview) {
      return res.status(400).json({ message: "Review already exists" });
    }
    const addedReview = await Review.create({
      images,
      rating,
      review,
      product: productId,
      user: req.user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating review" });
  }
};

const getReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(404).json({ message: "Provide review id" });
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ message: "Error getting review" });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(404).json({ message: "Provide review id" });
    }
    const { images, rating, review } = req.body;
    if (!images || !rating || !review) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    await Review.findByIdAndUpdate(
      reviewId,
      {
        $set: {
          images,
          rating,
          review,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating review" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(404).json({ message: "Provide review id" });
    }
    await Review.findByIdAndDelete(reviewId);
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting review" });
  }
};

const getAllReviewsByProduct = async (req, res) => {
  try {
    const productId = req.body();
    if (!productId) {
      return res.status(404).json({ message: "Provide product id" });
    }
    const reviews = await Review.find({ product: productId });
    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found" });
    }
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ message: "Error getting reviews" });
  }
};

export {
  addReview,
  getReview,
  updateReview,
  deleteReview,
  getAllReviewsByProduct,
};
