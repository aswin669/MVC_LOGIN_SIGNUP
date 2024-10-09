const express = require("express");
const { renderHome, addUser,loginPage, loginUser, loginSuccess } = require("../controller/userController");
const router = express.Router();

router.get("/", renderHome);
router.get("/login",loginPage)
router.post("/add", addUser);
router.post("/login",loginUser)
router.get("/loginSuccess",loginSuccess)

module.exports = router;