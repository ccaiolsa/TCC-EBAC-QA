const joi = require('joi')


const pedidoSchema = joi.object(
    {
        message: joi.string().required(),
        bookTitle: joi.string(),
        existingReservation: joi.object(
            {
                id: joi.number().integer().required(),
                bookId: joi.number().integer().required(),
                status: joi.string().required(),
                reservationDate: joi.date().required()
            })
    }).unknown(true)

module.exports = pedidoSchema 