const http = require('supertest');
const user = require('./user.js')
const request = http('http://localhost:3000')
let token


class Pedido {
    async fazerPedido(email, senha, produtoId) {
        await user.loginAdm(email, senha).then((resp) => {
            token = resp.body.token_for_swagger
        })
        const response = await request.post('/api/reservations')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    "bookId": produtoId
                }
            )
        console.log('RESPOSTA DA RESERVA', response.body)
        return response
    }

    async retirarReserva(email, senha, reservaId) {
        await user.loginAdm(email, senha).then((resp) => {
            token = resp.body.token_for_swagger
        })
        const response = await request.delete(`/api/reservations/${reservaId}`)
            .set('Authorization', `Bearer ${token}`)

        return response
    }

    async atualizarPedido(email, senha, reservaId) {
        await user.loginAdm(email, senha).then((resp) => {
            token = resp.body.token_for_swagger
        })
        const response = await request.put(`/api/reservations/${reservaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    action: `update_notes`
                }
            )
        console.log('RESPOSTA ATUALIZAR RESERVA', response.body)
        return response
    }
}


module.exports = new Pedido()