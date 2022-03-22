require("dotenv").config()
const stripeApi = require('stripe')(process.env.SECRET_KEY)

module.exports = stripeApi