const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string(),
  age: Joi.number(),
  color: Joi.string().min(3).max(10),
});
