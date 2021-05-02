const joi = require("joi");

// Register Validation
const registerValidation = data => {
    const schema = joi.object({
        name: joi.string().min(4).required(),
        username: joi.string().min(5).max(20).required(),
        email: joi.string().required().email(),
        password: joi.string().required().min(6)
    });
    return schema.validate(data);
}

// Login Validation
const loginValidation = data => {
    const schema = joi.object({
        // name: joi.string().min(4).required(),
        username: joi.string().min(5).max(20).required(),
        // email: joi.string().required().email(),
        password: joi.string().required().min(6)
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
