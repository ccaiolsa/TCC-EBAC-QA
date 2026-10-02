const request = require('supertest');
const carrinho = require('../requests/carrinho.js')
const carrinhoSchema = require('../schema/schema_US001-carrinho.js')
const bookId = 1

describe('US001 - Funcionalidade carrinho', () => {


    it('CT01 - Adicionar item ao carrinho com sucesso', async () => {
        await carrinho.adicionarLivro(bookId, 1).then((resp) => {
            expect(resp.status).toEqual(201)
            expect(resp.body.message).toEqual('Livro adicionado ao carrinho com sucesso.')
            expect(resp.body.addedDate).toBeDefined()
            expect(resp.body.itemId).toBeDefined()

            //Validar contrato
            const resultado = carrinhoSchema.validate(resp.body, {abortEarly: false})
            expect(resultado.error).toBeUndefined();

        })

        //limpar cesta
        await carrinho.limparCesta().then((resp) => {
            expect(resp.status).toEqual(200)
        })
    });

    it('CT02 - Atingir o limite máximo do mesmo produto', async () => {
        await carrinho.adicionarLivro(bookId, 2).then((resp) => {
            expect(resp.status).toEqual(400)
            expect(resp.body.message).toEqual('Quantidade deve ser 1 para livros.')

        })
    });

    it('CT03 - Adicionar uma quantidade além do estoque disponível', async () => {
        await carrinho.adicionarLivro(bookId, 5).then((resp) => {
            expect(resp.status).toEqual(400)
            expect(resp.body.message).toEqual('Quantidade deve ser 1 para livros.')

        })
    });

    it('CT04 - Adicionar item ao carrinho antes de definir suas especificações', async () => {
        await carrinho.adicionarLivro('', 0).then((resp) => {
            console.log(resp.body)
            expect(resp.status).toEqual(400)
            expect(resp.body.message).toEqual('userId e bookId são obrigatórios.')

        })
    });

});