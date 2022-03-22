const { Joi } = require('express-validation')

const registerValidation = {
    body: Joi.object({
        category: Joi.string().required(),
        username: Joi.string().alphanum().min(6).required(),
        email: Joi.string().lowercase()
              .regex(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{1,3})(\.[a-z]{1,3})?$/)
              .message("Please enter valid email").required(),
        password: Joi.string()
              .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
              .message("Please add atleast 8 charcters with 1 uppercase, 1 lowercase, 1 number and a special character").required(),
        confirmPassword: Joi.ref('password'),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    }),
  }

module.exports =  { registerValidation }