import http from 'k6/http';

export class Cesta {
    limparCesta(token) {
        const url = 'http://localhost:3000/api/basket';
        const params = {
            headers: {
                'Authorization': `${token}`
            },
        };
        const payload = JSON.stringify(
            {
                userId: 2
            }
        )

        const response = http.del(`${url}/2`, payload, params)

        if (response.status !== 200) {
            console.log("Status: ", response.status)
            console.log("Body: ", response.body)
            return null
        } else {
            console.log('STATUA DA REMOÇÃ: ', response.status)
            console.log('BODY DO CANCELAMENTO: ', response.body)
            return JSON.parse(response.body)
        }

    }

}

