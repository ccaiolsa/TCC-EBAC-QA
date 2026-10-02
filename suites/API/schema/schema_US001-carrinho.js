const joi = require('joi')


const carrinhoSchema = joi.object({

    message: joi.string().required(),
    itemId: joi.number().integer().required(),
    bookTitle: joi.string().required(),
    bookAuthor: joi.string().required(),
    addedDate: joi.date().required()
}).unknown(true);

module.exports = carrinhoSchema