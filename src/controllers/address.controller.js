import Address from "../models/address.model.js";

const addAddress = async (req, res) => {
  try {
    const { label, street, city, state, postalCode, country, location } =
      req.body;
    const exisitingAddress = await Address.findOne({
      "location.coordinates": location,
    });
    if (exisitingAddress) {
      return res.status(400).json({ message: "Address already exists" });
    }
    const address = await Address.create({
      label,
      street,
      city,
      state,
      postalCode,
      country,
      location,
      owner: req.user._id,
      isDefault: false,
    });
    return res
      .status(201)
      .json({ message: "Address created successfully", address });
  } catch (error) {
    return res.status(500).json({ message: "Error creating address" });
  }
};

const getAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    return res.status(200).json({ message: "Address found", address });
  } catch (error) {
    return res.status(500).json({ message: "Error getting address" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    const { label, street, city, state, postalCode, country, location } =
      req.body;
    if (label) {
      address.label = label;
    }
    if (street) {
      address.street = street;
    }
    if (city) {
      address.city = city;
    }
    if (state) {
      address.state = state;
    }
    if (postalCode) {
      address.postalCode = postalCode;
    }
    if (country) {
      address.country = country;
    }
    if (location) {
      address.location = location;
    }
    await address.save();
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating address" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting address" });
  }
};

export { addAddress, getAddress, updateAddress, deleteAddress };
