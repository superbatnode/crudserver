const { check_token } = require("../auth/token")

const tokenVerify = async (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    try{
        const validate = await check_token(token);
        req.id=validate._id; 
        next();
    }catch(error){
        return next(error);
    }
}
module.exports = tokenVerify;