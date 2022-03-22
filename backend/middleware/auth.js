const APIError = require('../helpers/APIError');
require('dotenv').config();
const httpStatus = require('http-status');
const resPattern = require('../helpers/resPattern');
const { User } = require('../model/userModel');
const jwt = require('jsonwebtoken');

const protect = async(req, res, next) => {
    let token;
    let message = 'Not authorized to access this route.';
    let msg = 'The user belonging to this token does not exist.';

    // check header for authorization
    if (req.headers.authorization) {
        if (req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            console.log("---token--", token)
        }
        else {
            token = req.headers.authorization;
            console.log("---token--", token)
        }
    }

    // check token
    if (!token) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('----decoded----', decoded);
        const decodeId = {email : decoded.email}
        console.log("decodeId...",decodeId);
        const user = await User.findOne({where : {email : decodeId.email}});
        console.log("user...",user);
        if(user){
            req.user = user;
            next();
        }else{
            return next(new APIError(msg, httpStatus.UNAUTHORIZED, true));
        }
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

module.exports = protect