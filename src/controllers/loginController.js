import Database from "../database/database.js";
import { gerarToken } from "../token/token-gen.js";

class LoginController {

    static async login(req, res) {
        const { email, pass } = req.body;

        let response = (await Database.executeQuery(`SELECT id, email, senha FROM usuarios WHERE email = '${email}' AND senha = '${pass}'`))[0];
        console.log(response);

        if (!response) {
            res.status(401).json({
                error: true,
                message: "Email ou senha incorretos"
            });
        } else {
            let id = response.id;
            var token = await gerarToken({
                id,
                email,
                pass
            });
            res.status(200).json({
                message: "Logado com sucesso!",
                token,
                error: false,
            });
        }

    }

    static async criarConta(req, res) {
        const {nome, email, senha} = req.body;
        console.log(email);
        let response = (await Database.executeQuery(`SELECT id FROM usuarios WHERE email = '${email}'`))[0];
        console.log(response);
        if (response) {
            res.status(500).json({
                error: true,
                message: "Usuário já existe!"
            });
        } else {
            try {
                await Database.executeQuery(`INSERT INTO usuarios(nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`);
                res.status(201).json({
                    error: false,
                    message: "Conta criada!"
                })
            } catch(error) {
                res.status(500).json({
                    error: true,
                    message: error
                })
            }
        }
    }

}

export default LoginController;