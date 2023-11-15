import express from 'express';
import LoginController from '../controllers/loginController.js';
import ValidateTokenController from '../controllers/validateTokenController.js';

let open_routes = express.Router();

open_routes.use(express.json());

open_routes.post("/login", LoginController.login);

open_routes.post("/valida_token", ValidateTokenController.validateToken);

open_routes.post("/criar-conta", LoginController.criarConta);


export default open_routes;