const router = require('express').Router();

const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')
const productRoutes = require('./routes/productRoutes')

router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/product', productRoutes);

module.exports = router;