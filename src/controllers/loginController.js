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

}

export default LoginController;