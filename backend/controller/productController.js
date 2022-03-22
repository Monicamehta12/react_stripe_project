const Product = require('../model/productModel')
const { sequelize, Op } = require('sequelize')
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
const resPattern = require('../helpers/resPattern');

const createProduct = async(req, res, next) => {
    console.log("hello")
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    try {
        const info = {
            productName: req.body.productName,
            description: req.body.description,
            image: req.file.path,
            price: req.body.price
        }
        const product = await Product.create(info);
        console.log("product", product);
        const obj = resPattern.successPattern(httpStatus.OK, product, 'success');
        return res.status(obj.code).json(obj.data)
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({});
        const obj = resPattern.successPattern(httpStatus.OK, products, 'success');
        return res.status(obj.code).json(obj.data)
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }

}

const getProductbyId = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("product-id", id)
        const product = await Product.findOne({ where: { id: id } });
        console.log('product', product)
        const obj = resPattern.successPattern(httpStatus.OK, product ,'success')
        return res.status(obj.code).json(obj.data);
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = { createProduct, getAllProducts, getProductbyId }