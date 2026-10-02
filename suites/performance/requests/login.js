import http from 'k6/http';

export function loginAdm (email, senha) {

    const url = 'http://localhost:3000/api/login';
    const params = {
        headers: {
            'Content-type': 'application/json'
        },
    };
    const payload = JSON.stringify(
        {
            "email": email,
            "password": senha
        }
    )
        const response = http.post(url, payload, params)

        if(response.status !== 200){
            console.log("Status: ", response.status)
            console.log("Body: ",response.body)
            return null
        }else{
            const body = JSON.parse(response.body)
            return body.token
        }

};