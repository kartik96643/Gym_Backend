const JWT = require("jsonwebtoken");

const secret_key = "kartik@0909";

function GenerateToken(user){
    const payLoad = {
        _id: user._id,
        name:user.userName,
        email: user.email,
    }

    const token = JWT.sign(payLoad, secret_key);
    return token;
};

const validateToken = async(token)=>{
    // console.log(token)
    const payLoad = await JWT.verify(token, secret_key);
    if(!payLoad) throw new Error("Invalid Token");
    return payLoad ;
}
   
module.exports = {
    GenerateToken, validateToken,
}