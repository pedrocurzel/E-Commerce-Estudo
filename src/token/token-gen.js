import jsonwebtoken from 'jsonwebtoken';

const chavePrivada = "teste_token_chave_privada";

export async function gerarToken(usuarioObj) {
    return await new Promise((resolve, reject) => {
        return jsonwebtoken.sign(usuarioObj, chavePrivada, (err, success) => {
            if (err) {
                console.log(1);
                reject(err);
                return;
            }
            resolve(success);
            return;
        });
    });
}

export async function validarToken(token) {
    return new Promise((resolve, reject) => {
        return jsonwebtoken.verify(token, chavePrivada, (err, success) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(success);
            return;
        });
    });
}