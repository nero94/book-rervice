const Joi = require('@hapi/joi');

const schema = Joi.object({
  uuid: Joi.string().guid().required(),
  name: Joi.string().required(),
  releaseDate: Joi.date().timestamp(),
  authorName: Joi.string().required(),
});

module.exports = schema;
