const joi = require('joi')

const detalheSchema = joi.object(
    {
        message: joi.string().required(),
        user: joi.object({
            id: joi.number().integer().required(),
            name: joi.string().required(),
            email: joi.string().required(),
            isAdmin: joi.number().integer().required(),
            updated_at: joi.date().required()
        })
    }
).unknown(true)

module.exports = detalheSchema 

