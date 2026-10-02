const http = require('supertest');
const user = require('./user.js')
const request = http('http://localhost:3000')

const emailAdmin = process.env.EMAIL_ADM;
const senhaAdmin = process.env.SENHA_ADM;

let token
let userId

class Carrinho {

    async adicionarLivro(bookId, qtd) {
        const userToken = await user.loginAdm(emailAdmin, senhaAdmin)
        token = userToken.body.token_for_swagger
        userId = userToken.body.id

        const response = await request.post('/api/basket')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    "userId": `${userId}`,
                    "bookId": `${bookId}`,
                    "quantity": qtd
                }
            )


        return response
    };
    async limparCesta() {
        const response = await request.delete(`/api/basket/${userId}`)
            .set('Authorization', `Bearer ${token}`)

        return response
    }

};

module.exports = new Carrinho()
