const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  color: Joi.string().min(3).max(10),
});
