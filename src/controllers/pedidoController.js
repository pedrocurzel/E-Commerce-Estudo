import Database from "../database/database.js";
import { decode } from "../token/token-gen.js";

export default class PedidoController {
    static async criarPedido(req, res) {
        try {
            var usuario = await decode(req.headers.token);
            var body = req.body;

            console.log(body);

            var pedidoId = (await Database.executeQuery(`INSERT INTO pedido(dataPedido, usuarioId, precoTotalPedido) VALUES ('${body.dataPedido}', ${usuario.id}, '${body.precoTotal}')`)).insertId;
            
            for(let i = 0; i < body.items.length; i++) {
                let item = body.items[i];
                await Database.executeQuery(
                    `INSERT INTO itemPedido(pedidoId, produtoId, quantidade) VALUES 
                    (${pedidoId}, ${item.id}, ${item.quantidade})`);
            }


            res.status(201).json({
                error: false,
                message: "Sucesso ao criar pedido!"
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                error: true,
                message: "Erro ao criar pedido!",
                stack: JSON.stringify(e)
            })
        }
    }

    static async retrieveLastPedidoId(req, res) {
        try {
            let response = await Database.executeQuery(`SELECT pedidoId from pedido ORDER BY pedidoId DESC LIMIT 1;`);

            res.status(200).json({
                error: false,
                message: "Sucesso ao pegar ultimo pedido id",
                pedidoId: response.length == 0 ? 0 : response[0].pedidoId
            })

        } catch(e) {
            res.status(500).json({
                error: true,
                message: "Erro ao pegar ultimo pedido id",
                stack: JSON.stringify(e)
            })
        }
    }

    static async listarPedidos(req, res) {
        try {
            let usuario = await decode(req.headers.token);

            let response = await Database.executeQuery(`SELECT * FROM pedido WHERE usuarioId = ${usuario.id}`);

            for(let i = 0; i < response.length; i++) {
                response[i].items = await Database.executeQuery(
                    `SELECT * FROM itemPedido as i inner join produtos as p on i.produtoId = p.id where i.pedidoId = ${response[i].id}`);
                for(let j = 0; j < response[i].items.length; j++) {
                    response[i].items[j].imagem = (await Database.executeQuery(`SELECT * FROM imagens WHERE imagens.produtoId = ${response[i].items[j].id} LIMIT 1`))[0];
                }
            }



            res.status(200).json({
                error:false,
                message:"sucesso ao buscar pedidos",
                pedidos: response
            })

        } catch(e) {
            console.log(e);
            res.status(500).json({
                error:true,
                message:"erro ao buscar pedidos",
                stack: JSON.stringify(e)
            })
        }
    }
}