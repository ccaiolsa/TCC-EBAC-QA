const request = require('supertest');
const perfil = require('../requests/perfil.js')
const detalheSchema = require('../schema/schema_US004-detalhe_conta.js')
const num = Math.floor(Math.random() * 100)

describe('US004 - Detalhes da conta do usuário', () => {

    it('CT01 - Configurar detalhes da conta do usuário com sucesso', async () => {
        await perfil.confConta(1, `usuario${num}`, `usuario${num}@email.com`, `senha${num}`).then((resp) => {
            expect(resp.status).toEqual(200)
            expect(resp.body.message).toEqual('Usuário atualizado com sucesso.')
            expect(resp.body.user.name).toEqual(`usuario${num}`)
            expect(resp.body.user.email).toEqual(`usuario${num}@email.com`)

            // Valiar contrato
            const resultado = detalheSchema.validate(resp.body, {abortEarly: false})
            expect(resultado.error).toBeUndefined()

        })

    });
    it('CT02 - Configurar detalhes da conta com email inválido', async () => {
        await perfil.confConta(1, `usuario${num}`, `usuario${num}email.com`, `senha${num}`).then((resp) => {
            expect(resp.status).toEqual(400)
            expect(resp.body.message).toEqual('Formato de email inválido.')
        })
    });
    it('CT03 - Configurar detalhes não preenchendo campos obrigatórios', async () => {
        await perfil.confConta(1, ``, ``, ``).then((resp) => {
            expect(resp.status).toEqual(200)
            expect(resp.body.message).toEqual('Nenhum campo foi alterado.')
            expect(resp.body.user.name).toEqual(`usuario${num}`)
            expect(resp.body.user.email).toEqual(`usuario${num}@email.com`)
        })
    });
    it('CT04 - Configurar detalhes da conta apenas com email válido', async () => {
        await perfil.confConta(1, ``, `usuario${num}@email.com`, ``).then((resp) => {
            expect(resp.status).toEqual(200)
            expect(resp.body.message).toEqual('Usuário atualizado com sucesso.')
        })
    });
});