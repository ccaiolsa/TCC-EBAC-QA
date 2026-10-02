const joi = require('joi')


const minha_contaSchema = joi.object({
    message: joi.string().required(),
    user: joi.object({
        id: joi.number().integer().required(),
        name: joi.string().required(),
        email: joi.string().email().required(),
        isAdmin: joi.boolean().required(),
        created_at: joi.date().required()
    }).unknown(true)
})

module.exports = minha_contaSchema 