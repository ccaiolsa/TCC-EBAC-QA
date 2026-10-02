const request = require('supertest');
const pedido = require('../requests/pedido.js')
const pedidoSchema = require('../schema/schema_US008-pedido.js')

const email = process.env.EMAIL_ADM;
const senha = process.env.SENHA_ADM;
    
let produtoId = 2
let reservaId

describe('US008 - Realizar reserva', () => {

    it('CT01 - Realizar reserva com sucesso', async () => {
        await pedido.fazerPedido(email, senha, produtoId).then((resp) => {
            reservaId = resp.body.reservation.id
            expect(resp.status).toEqual(201)
            expect(resp.body.message).toBe('Reserva criada com sucesso.')
            expect(resp.body.reservation.id).toEqual(reservaId)

            // validar contrato
            const resultado = pedidoSchema.validate(resp.body, { abortEarly: false })
            expect(resultado.error).toBeUndefined()

        })

    });

    it('CT02 - Atualizar reserva', async () => {
        await pedido.atualizarPedido(email, senha, reservaId).then((resp) => {
            console.log('RESPOSTA ATUALIZAR RESERVA', resp.body)
            expect(resp.status).toEqual(200)
            expect(resp.body.message).toBe('Observações atualizadas com sucesso.')
        })
    });

    it('CT03 - Cancelar reserva', async () => {
        await pedido.retirarReserva(email, senha, reservaId).then((resp) => {
            console.log('RESPOSTA CANCELAR RESERVA', resp.body)
            expect(resp.status).toEqual(200)
            expect(resp.body.message).toBe('Reserva cancelada com sucesso.')
            expect(resp.body.cancelledReservation.id).toEqual(reservaId)
        })
    });

});