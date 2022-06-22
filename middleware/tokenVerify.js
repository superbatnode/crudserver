const { check_token } = require("../auth/token");
const CustomError = require("../error/CustomError");

const tokenVerify = async (req, res, next) => {
    const header = req.headers["authorization"];
    if(!header)
    return next(CustomError.unauthorized("unauthorized access denied"));
    const token = header.split(" ")[1];
    console.log("token ", token)
    try{
        const validate = await check_token(token);
        req.id=validate._id; 
        next();
    }catch(error){
        return next(error);
    }
}
module.exports = tokenVerify;