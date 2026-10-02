import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';
const email = __ENV.EMAIL_ADM;
const senha = __ENV.SENHA_ADM;

export const options = {
    stages: [
        { duration: '20s', target: 20 },
        { duration: '2m', target: 20 }
    ],
};

export default () => {
    const url = 'http://localhost:3000/api/login';
    const params = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    const payload = JSON.stringify(
        {
            "email": `${email}`,
            "password": `${senha}`

        });

    const response = http.post(url, payload, params)

    describe('Realizar o login de 20 VU com RamUp de 20 seg e duração de 2 min', () => {
        expect(response.status).to.equal(200)

    });

};