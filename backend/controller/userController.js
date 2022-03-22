const { User, generatePassword } = require('../model/userModel')
const Project = require('../model/projectModel')
const schema = require("../helpers/joi.validation.helper")
const Joi = require('joi')
// const db = require('../model/index');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
const resPattern = require('../helpers/resPattern');
const { generateString } = require("../helpers/commonFile")
const { encryptPassword, decryptPassword } = require("../helpers/password.helper");

// const User = db.users;

const register = async (req, res, next) => {
    try {
        const reqEmail = req.body.email;
        const reqPswd = req.body.password;
        console.log("reqPswd", reqPswd);
        const password = await encryptPassword(reqPswd);
        const emailUser = await User.findOne({ where: { email: reqEmail } })
        if (emailUser) {
            const message = 'You have already registered with this email';
            // res.status(200).json({error : {message}});
            return next(new APIError(message, httpStatus.BAD_REQUEST, true));
        }
        else {
            req.body.password = password;
            console.log("reqbody.password...", req.body.password);
            const resUser = await User.create(req.body);
            console.log("res user", resUser);
            const obj = resPattern.successPattern(httpStatus.CREATED, resUser, 'success')
            console.log("obj", obj);
            return res.status(obj.code).json(obj)
        }
    }
    catch (e) {
        // return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true))
        return next(new APIError(e.message, httpStatus.BAD_REQUEST));
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({});
        const obj = resPattern.successPattern(httpStatus.OK, users, 'success')
        console.log("obj", obj);
        return res.status(obj.code).json(obj.data);
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getEmployees = async( req, res, next ) => {
    try {
        const employees = await User.findAll({
            where: { category: "employee"},
            attributes: [['id','value'], 'firstName']
        })
        const obj = resPattern.successPattern(httpStatus.OK, employees , 'success')
        console.log("obj", obj);
        return res.status(obj.code).json(obj.data);
    }
    catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = { register, getUsers, getEmployees }