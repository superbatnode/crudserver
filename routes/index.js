const UserController  = require("../controller/userController");
const registerUser = require("../middleware/registerUser");

const router  = require("express").Router();
router.get("/user",UserController.alluser);
router.post("/registration",registerUser, UserController.register)


module.exports = router;