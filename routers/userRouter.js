const express = require('express');
const { users } = require('../data/users.json'); 
const router = express.Router();

//-------------- get all users ---------------
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Users list retrieved successfully",
        data: users,
    });
});

//------------ get users by id -----------------
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
  
    if (user) {
      res.status(200).send({ 
        message: "User found", 
        data:user 
    });
    } else {
      res.status(404).send({ 
        message: "User  not found" 
    });
    }
  });


//------------ add new user -----------------
router.post("/", (req, res) => {
    const { id, name, age, email, phone, city } = req.body;
    if (!id || !name || !age || !email || !phone || !city) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const existingUser  = users.find((user) => user.id === id);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User  with this ID already exists",
      });
    }
    const newUser = {
      id,
      name,
      age,
      email,
      phone,
      city,
    };
    users.push(newUser);
    res.status(201).json({
      success: true,
      message: "User  added successfully",
      data: newUser,
    });
  });

module.exports = router;
