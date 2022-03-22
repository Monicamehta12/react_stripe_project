const { User, generateJwtToken } = require('../model/userModel')
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
const resPattern = require('../helpers/resPattern');
const { encryptPassword, decryptPassword } = require("../helpers/password.helper")

const login = async (req,res,next) =>{
    try {
        const {email,password} = req.body;
        console.log("email....",email);
        console.log("password...",password);
        // find user and verify email
        const user = await User.findOne({where : {email : email}});
        console.log("user....",user);
        console.log("user.password", password);
        if(!user){
            const message = `Incorrect email or password.`;
            // res.status(200).json({error : {message}})
            return next(new APIError(message, httpStatus.FORBIDDEN, true));
        }

        const ismatch = await decryptPassword(password, user.password);
        console.log("ismatch....",ismatch);
        if(!ismatch){
            const message = `Incorrect email or password..`;
            // res.status(200).json({error : {message}})
            return next(new APIError(message, httpStatus.BAD_REQUEST, true));
        }

        // get token
        const token = generateJwtToken(user);
        console.log("token", token);
        // delete user['password']:
        user["password"] = undefined;
        
        // send response
        const response = { user ,token } 
        console.log("response---", response)
        let obj = resPattern.successPattern(httpStatus.OK, response, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(e.message,httpStatus.BAD_REQUEST,true));
    }
}

module.exports = { login }