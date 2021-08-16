const Joi = require("joi");

const regValidate = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(req);
};
const loginValidate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(req);
};

module.exports.regValidate = regValidate;
module.exports.loginValidate = loginValidate;
