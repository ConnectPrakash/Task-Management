const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("../modules/UserModel");
const genreateToken = require("../util/index");

module.exports.UserController = async (req, res) => {
  try {
    const { name, email, password, role, isSuperAdmin, companyName, companyAddress, companyWebsite,securityKey, companyId, User } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const roleLowerCase = role.toLowerCase(); // Convert role to lowercase

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (roleLowerCase === "admin") {
      newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role:roleLowerCase,
        isSuperAdmin,
        companyName,
        companyAddress,
        companyWebsite,
        companyId,
        securityKey,
        User: [], // Admin starts with an empty list of users
      });
    } else {
      newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role:roleLowerCase,
        isSuperAdmin,
        securityKey,
        companyId,
      });

      // Find the admin of this company and add the new employee under their `User` array
      const admin = await UserModel.findOne({ securityKey, role: "admin" });
      if (admin) {
        await UserModel.findByIdAndUpdate(admin._id, {
          $push: { User: newUser._id },
        });
      } else {
        return res.status(400).json({ message: "Admin not found for this company" });
      }
    }

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error Creating User",
      error: error.message,
    });
  }
};


module.exports.UserLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Not Found ❌" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password ❌" });
    }

    // Generate token
    const token = genreateToken(user);

    if (!token) {
      return res.status(500).json({ message: "Token generation failed ❌" });
    }

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error ❌" });
  }
};
module.exports.EditUserController = async (req, res) => {
  try {
    const { name, email, password, role, isSuperAdmin, companyId } = req.body;
    const { id } = req.params;
    const updateUser = await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      password,
      role,
      isSuperAdmin,
      companyId,
    });

    res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Updating User",
      error: error.message,
    });
  }
};

module.exports.DeleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const DeleteUser = await UserModel.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
      data: DeleteUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Deleting User",
      error: error.message,
    });
  }
};

module.exports.AllUserController = async (req, res) => {
  try {
    const allUser = await UserModel.find({});

    res.status(201).json({
      success: true,
      message: "All User List",
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching User",
      error: error.message,
    });
  }
};

module.exports.OneUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const OneUser = await UserModel.findById(id);

    res.status(201).json({
      success: true,
      message: "fetch one User data",
      data: OneUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching One User",
      error: error.message,
    });
  }
};

