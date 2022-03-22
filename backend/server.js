const express = require('express');
const bodyParser = require('body-parser')
const httpStatus = require('http-status');
const expressValidation = require("express-validation")
const fs = require("fs");
require('dotenv').config()
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize')
// const { validate, ValidationError, Joi } = require('express-validation')
const APIError = require('./helpers/APIError')
const createCheckoutSession = require('./checkout/checkout')

// let dir = "./public/images";
// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir, { recursive: true });
// }

const csrfProtection = csrf({ cookie: true })

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cookieParser())

app.disable('x-powered-by')

// set cors...
const PROTOCOL = process.env.PROTOCOL || 'http'
const HOSTNAME = process.env.HOST || 'localhost'
const CORS =
  process.env.NODE_ENV === 'production' ? `${PROTOCOL}://${HOSTNAME}` : `*`

app.use(cors());

app.use(helmet({
  crossOriginEmbedderPolicy: false,
}))

app.use(function (req, res, next) {
  // res.header("Cross-Origin-Resource-Policy: cross-origin")
  res.header("Access-Control-Allow-Origin", CORS);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const sequelize = require('./config/db');
const router = require('./index');
app.use('/api/', router);

app.use('/Images', express.static('Images'));

//port
const PORT = process.env.PORT || 8080;

//testing api
app.get('/', csrfProtection, (req, res) => {
  // pass the csrfToken to the view
  res.json({ csrfToken: req.csrfToken() })
  // res.render('send', { csrfToken: req.csrfToken() })
})

app.post('/payment', cors(), createCheckoutSession)
// app.get('/', (req, res) => {
//     res.json({ message: 'Hello from Api'})
// })

// validate errors
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const error = new APIError(err.details, err.statusCode, true);
    console.log("error", error.message)
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(
      err.message,
      err.status,
      err.name === "UnauthorizedError" ? true : err.isPublic
    );
    return next(apiError);
  }
  return next(err);
});

// validate unknown routes
// app.use((req, res, next) => {
//   const error = new APIError("API Not Found", httpStatus.NOT_FOUND, true);
//   return next(error);
// });

app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: {
      message: err.isPublic ? err.message : httpStatus[err.status],
    },
  });
});


app.listen(PORT, () => {
    sequelize.sync().then(() => console.log('Successfully connected to DB')).catch(e => console.log(e));
    console.log(`server started on the port ${8080}`);
  });


