import express from 'express';
import { validaToken } from './middlewares/verify-token-middleware.js';

let routes = express.Router();

routes.use(validaToken);

routes.get("/home", (req, res) => {
    res.send("ok home");
});

export default routes;