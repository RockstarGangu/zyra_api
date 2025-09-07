import Vendor from "../models/vendor.model.js";
import User from "../models/user.model.js";

const listCompany = async (req, res) => {
  try {
    const { brandName, brandTagline, logo, aboutBrand, address, links } =
      req.body;

    if (
      !brandName &&
      !brandTagline &&
      !logo &&
      !aboutBrand &&
      !address &&
      !links
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const existingVendor = await Vendor.findOne({
      brandName,
    });

    if (existingVendor) {
      return res.status(400).json({
        message: "Brand name already exists",
      });
    }

    await Vendor.create({
      brandName,
      brandTagline,
      logo,
      aboutBrand,
      address,
      links,
      owner: req.user._id,
      isActive: true,
    });

    await User.findByIdAndUpdate(
      req.user._id,
      { role: "vendor" },
      { new: true }
    );
    return res.status(200).json({ message: "Company created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateDetails = async (req, res) => {
  try {
    const { brandName, brandTagline, logo, aboutBrand, links } = req.body;
    if (!brandName || !brandTagline || !logo || !aboutBrand || !links) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const vendorId = req.params.id;

    await Vendor.findByIdAndUpdate(
      vendorId,
      {
        $set: {
          brandName,
          brandTagline,
          logo,
          aboutBrand,
          links,
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

const getVendorDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const vendor = await Vendor.findById({
      owner: req.user._id && user.role === "vendor",
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json({ vendor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// const getAllVendors = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const vendors = await Vendor.find({ owner: user._id && user.role === "vendor" });

//     return res.status(200).json({ vendors });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };

const deleteVendor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const vendor = await Vendor.findById({
      owner: req.user._id && user.role === "vendor",
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    await Vendor.findByIdAndDelete(req.user._id);

    await User.findByIdAndUpdate(req.user._id, { role: "user" }, { new: true });

    return res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  listCompany,
  updateDetails,
  getVendorDetails,
  // getAllVendors,
  deleteVendor,
};
