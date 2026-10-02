const http = require('supertest')
const request = http('http://localhost:3000');


class User {

    async loginAdm(email, senha) {

        const response = await request.post('/api/login')
            .send(
                {
                    "email": email,
                    "password": senha
                }
            )
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)

        return response;
    }

    async novoUsuario(nome, email, senha) {
        const response = await request.post('/api/users')
            .send(
                {
                    "name": nome,
                    "email": email,
                    "password": senha
                }
            )
            return response
    }

    async deletarUsuario(userId, email, senha){
        const login = await this.loginAdm(email, senha)
        const token = login.body.token_for_swagger    

        const response = await request.delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)

        return response
    }
}

module.exports = new User();