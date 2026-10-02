const request = require('supertest');
const user = require('../requests/user.js')
const minha_contaSchema = require('../schema/schema_US007-minha_conta.js')

const email = process.env.EMAIL_ADM;
const senha = process.env.SENHA_ADM;

const num = Math.floor(Math.random() * 1000)
let userId;


describe('US007 - Adicionar novo usuário', () => {

    it('CT01 - Realizar registro de usuário com sucesso', async () => {
        await user.novoUsuario(`usuario${num}`, `usuario${num}@email.com`, `senha${num}`).then((resp) => {
            userId = resp.body.user.id;
            expect(resp.status).toEqual(201)
            expect(resp.body.message).toBe('Usuário criado com sucesso.')

            //Validar contrato
            const resultado = minha_contaSchema.validate(resp.body, {abortEarly: false})
                expect(resultado.error).toBeUndefined()
 
            // Deletar usuário
            user.deletarUsuario(userId, email, senha).then((resp =>{
                expect(resp.status).toEqual(200)

            }))

        })



    })

    it('CT02 - Fazer cadastro sem preencher senha', async () => {
        await user.novoUsuario(`usuario${num}`, `usuario${num}@email.com`, ``).then((resp) => {
            expect(resp.status).toEqual(400)
            expect(resp.body.message).toBe('Nome, email e senha são obrigatórios.')
        })

    });

    it('CT03 - Fazer cadastro sem preencher email', async () => {
        await user.novoUsuario(`usuario${num}`, ``, `senha${num}`).then((resp) => {
            expect(resp.status).toEqual(400)
            expect(resp.body.message).toMatch('Nome, email e senha são obrigatórios.')
        })

    });

    it('CT04 - Realizar registro sem preencher um campo', async () => {
        await user.novoUsuario(`usuario${num}`, ``, ``).then((resp) => {
            expect(resp.status).toEqual(400)
            expect(resp.body.message).toMatch('Nome, email e senha são obrigatórios.')
        })

    })


})