const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel.js");

//-------------- get all users ---------------
router.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json({
    message: "Users list retrieved successfully",
    data: users,
  });
});

//------------ get users by id -----------------
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await UserModel.findOne({ id: id });

  if (user) {
    res.status(200).send({
      message: "User found",
      data: user,
    });
  } else {
    res.status(404).send({
      message: "User not found",
    });
  }
});

//------------ add new user -----------------
router.post("/", async (req, res) => {
  const { id, name, age, email, phone, city } = req.body;
  if (!id || !name || !age || !email || !phone || !city) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const existingUser = await UserModel.findOne({ id: id });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User with this ID already exists",
    });
  }

  const newUser = new UserModel({
    id,
    name,
    age,
    email,
    phone,
    city,
  });

  await newUser.save();
  res.status(201).json({
    success: true,
    message: "User added successfully",
    data: newUser,
  });
});

//------------ delete user -----------------
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await UserModel.findOne({ id: id });

  if (user) {
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});


//------------ update user -----------------
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, email, phone, city } = req.body;
  const user = await UserModel.findOne({ id: id });
  if (user) {
    user.name=name;
    user.age = age;
    user.email = email;
    user.phone = phone;
    user.city = city;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

module.exports = router;