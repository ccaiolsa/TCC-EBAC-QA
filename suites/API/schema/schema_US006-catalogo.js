const joi = require('joi')


const catalogoSchema = joi.object(
    {
        books: joi.array()
            .items(
                joi.object({
                    id: joi.number().integer().required(),
                    title: joi.string().required(),
                    author: joi.string().required(),
                    description: joi.string().required(),
                    category: joi.string().required(),
                    isbn: joi.string().required(),
                    editor: joi.string().required(),
                    language: joi.string().required(),
                    publication_year: joi.number().integer().required(),
                    pages: joi.number().integer().required(),
                    format: joi.string().required(),
                    total_copies: joi.number().integer().required(),
                    available_copies: joi.number().integer().required(),
                    cover_image: joi.string().required(),
                    created_at: joi.date().required()

                })
            )

    }).unknown(true)

    module.exports = catalogoSchema