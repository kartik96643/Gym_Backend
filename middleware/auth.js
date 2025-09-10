const {validateToken} = require('../services/auth');

function checkToken(token){
    return async(req, res, next)=>{
        // console.log("header", req.header('token'))
        // console.log(token)
        const cookieValue = req.cookies[token];
        if(!cookieValue) {
            return next();
        }

        try {
            const payload = await validateToken(cookieValue); 
            req.user = payload;
        } catch (error) {
            console.error('Invalid token:', error);
            req.user = null;
        }

        next();
    }
}

module.exports = {checkToken,}