const { User } = require("../database");
const bcrypt = require("bcrypt");
const { exist } = require("joi");
const CustomError = require("../error/CustomError");
const {access_token} = require("../auth/token");
const saltRounds = 10;
class UserController {
    static async register(req, res, next) {
        const { username, firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const usernameExists = await User.exists({ username });
        if (usernameExists)
            return next("username already exists");

        const emailExists = await User.exists({ email });
        if (emailExists)
            return next("Email already exists");

        try {
            const save = await user.save()
        } catch (e) {
            next(e);
        }

        res.json(req.body);

    }

    static async alluser(req, res, next) {
        const users = await User.find({}, "firstName lastName email");
        res.json(users);
    }

    static async login(req, res, next) {
          console.log(req.body);
        const exist = await User.findOne({ username: req.body.username });
        if (!exist)
            return next(CustomError.unauthorized("User doesn't exist"));

        const passwordMatched = await bcrypt.compare(req.body.password, exist.password)

        if (!passwordMatched)
            return next(CustomError.invalidInput("password or username is invalid "));

        try {
            const token = await access_token({
                _id: exist._id,
                username: exist.username,
            });
            res.json({
                access_token: token
            });
        } catch (e) {
            return next("couldn't create token: ",e);
        }
    }

    static async getUser(req, res, next) {
        try{
            const user = await User.findOne({_id:req.id},"firstName lastName email username");
            res.json(user);
        }
        catch(e){
            next(e);
        }

    }


}
module.exports = UserController; 