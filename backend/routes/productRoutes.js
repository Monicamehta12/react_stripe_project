const router = require('express').Router()
const productCtrl = require('../controller/productController')
const { upload } = require('../helpers/fileUpload.helper')

router.route('/Addproduct').post(upload, productCtrl.createProduct)
router.route('/Viewproduct').get(productCtrl.getAllProducts)
router.route('/Viewproduct/:id').get(productCtrl.getProductbyId)

module.exports = router