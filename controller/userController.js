const { User } = require("../database");
const bcrypt = require("bcrypt");
const { exist } = require("joi");
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
        
        const usernameExists = await User.exists({username});
        if (usernameExists)
        return next("username already exists");

        const emailExists = await User.exists({email});
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
}
module.exports = UserController; 