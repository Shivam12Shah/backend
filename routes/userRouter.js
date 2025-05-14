const express = require("express");
const router = express.Router();

const { registernewuser, signupuser ,logoutuser} = require("../controllers/userControllers");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to our API!" });
});

router.post("/registeruser", registernewuser);

router.post("/loginuser", signupuser);

router.get("/logout", logoutuser);




module.exports = router;
