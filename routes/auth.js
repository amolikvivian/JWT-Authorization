const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { regValidate, loginValidate } = require("../validation/validation");

router.post("/register", async (req, res) => {
  //Validating request body
  const regValidation = regValidate(req.body);
  if (regValidation.error)
    return res.status(400).send(regValidation.error.details[0].message);

  //Checking for duplicate users
  const isDuplicate = await User.findOne({ email: req.body.email });
  if (isDuplicate)
    return res
      .status(400)
      .send("A User already exists with the same email address.");

  //Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const registeredUser = await user.save();
    res.send(registeredUser);
  } catch (error) {
    res.send(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const loginValidation = loginValidate(req.body);
  if (loginValidation.error)
    return res.status(400).send(loginValidation.error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid Password");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
