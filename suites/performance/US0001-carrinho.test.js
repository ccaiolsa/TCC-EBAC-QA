import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';
import { check } from 'k6';
import { loginAdm } from './requests/login.js';
import { Cesta } from './requests/cesta.js';
const email = __ENV.EMAIL_ADM;
const senha = __ENV.SENHA_ADM;
const reserva = new Cesta()

export const options = {
    /*stages: [
    
        { duration: '20s', target: 20 },
        { duration: '2m', target: 20 }
    ],
    */
};

export default () => {
    const token = loginAdm(email, senha)
    const url = 'http://localhost:3000/api/basket';
    const params = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `${token}`
        },
    };
    const payload = JSON.stringify(
        {
            "userId": 2,
            "bookId": 1,
            "quantity": 1
        }
    );
    const resp = http.post(url, payload, params)
    const deletar = reserva.limparCesta(token)

    describe('CT01 - Adicionar produto no carrinho com sucesso', () => {
        console.log('STATUS: ', resp.status)
        console.log('BODY: ', resp.body)
        check(resp, { 'Adicionado com sucesso': (r) => r.status === 201 })

    });

};