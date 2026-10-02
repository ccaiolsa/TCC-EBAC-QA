const http = require('supertest');
const user = require('./user.js')
const request = http('http://localhost:3000')

const emailAdmin = process.env.EMAIL_ADM;
const senhaAdmin = process.env.SENHA_ADM;

let token

class Perfil {
    async confConta(userId, nome, email, senha) {
        const userToken = await user.loginAdm(emailAdmin, senhaAdmin)
        token = userToken.body.token_for_swagger

        const response = await request.put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    "name": `${nome}`,
                    "email": `${email}`,
                    "password": `${senha}`
                }
            )
            return response
    }

}
module.exports = new Perfil()