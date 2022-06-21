const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    firstName:String,
    lastName:String,
    email:{type:String, unique:true},
    password:String
});
const User = new mongoose.model("users",userSchema);

module.exports = User; 

//username, password, confirm password, email id, firstname, lastname
