const UserController  = require("../controller/userController");
const addressVerify = require("../middleware/addressVerify");
const loginDetailsValidator = require("../middleware/loginDetailsValidator");
const registerUser = require("../middleware/registerUser");
const tokenVerify = require("../middleware/tokenVerify");

const router  = require("express").Router();
router.get("/all_users",UserController.alluser);
router.post("/registration",registerUser, UserController.register)
router.post("/login",loginDetailsValidator, UserController.login);
router.get("/get",tokenVerify, UserController.getUser);
router.put("/delete",tokenVerify, UserController.deleteUser);
router.get("/list/:page",UserController.listOfTen);
router.post("/address",tokenVerify,addressVerify, UserController.address);
module.exports = router;