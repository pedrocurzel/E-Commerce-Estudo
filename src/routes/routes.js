import express from 'express';
import { validaToken } from './middlewares/verify-token-middleware.js';
import LoginController from '../controllers/loginController.js';
import ProdutosController from '../controllers/produtosController.js';
import PedidoController from '../controllers/pedidoController.js';

let routes = express.Router();
routes.use(express.json());
routes.use(validaToken);

routes.get("/home", (req, res) => {
    res.status(200).json({
        error: false,
        message: "ok home"
    })
});

routes.get("/listar-produtos", ProdutosController.getProdutos);
routes.get("/produto/:id", ProdutosController.getProduto);
routes.post("/criar-pedido", PedidoController.criarPedido);
routes.get("/ultimo-pedidoId", PedidoController.retrieveLastPedidoId);
routes.get("/listar-pedidos", PedidoController.listarPedidos);

export default routes;