const joi = require('joi')

const userSchema = joi.object({

    id: joi.number().integer().required(),
    name: joi.string().required(),
    email: joi.string().required(),
    isAdmin: joi.boolean().required()

}).unknown(true);

module.exports = userSchema
