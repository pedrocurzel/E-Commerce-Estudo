import { validarToken } from "../token/token-gen.js";

class ValidateTokenController {
    static async validateToken(req, res) {
        const { token } = req.body;

        try {
            await validarToken(token);
            res.status(200).json({
                error: false,
                message: "token valido"
            });
        } catch(e) {
            res.status(401).json({
                error: true,
                message: "token vencido!!"
            });
        }

    }
}

export default ValidateTokenController;