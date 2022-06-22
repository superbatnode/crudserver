const UserController  = require("../controller/userController");
const loginDetailsValidator = require("../middleware/loginDetailsValidator");
const registerUser = require("../middleware/registerUser");
const tokenVerify = require("../middleware/tokenVerify");

const router  = require("express").Router();
router.get("/all_users",UserController.alluser);
router.post("/registration",registerUser, UserController.register)
router.post("/login",loginDetailsValidator, UserController.login);
router.get("/get",tokenVerify, UserController.getUser);
module.exports = router;