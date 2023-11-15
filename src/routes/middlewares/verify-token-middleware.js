import { validarToken } from "../../token/token-gen.js";

export async function validaToken(req, res, next) {
    const { token } = req.headers;
    //console.log(token);
    if (token) {
        try {
            let validou = await validarToken(token);
            next();
            return;
        } catch(e) {
            error(res);
            return;
        }
    }

    error(res);
    return;
}

function error(res) {
    return res.status(401).json({
        "error": true,
        message: "Unauthorized"
    });
}