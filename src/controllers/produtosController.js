import Database from "../database/database.js";

export default class ProdutosController {
    static async getProdutos(req, res) {
        try {
            let produtos = await Database.executeQuery(`SELECT * FROM produtos`);

            let produtosMapeados = [];

            produtos.forEach(produto => {
                produtosMapeados.push({
                    id: produto.id,
                    nome: produto.nome,
                    categoria: produto.categoria,
                    preco: produto.preco,
                    descricao: produto.descricao,
                    disponivel: produto.disponivel == 1,
                    marca: produto.marca
                })
            })

            //
            
            for(let i = 0; i < produtosMapeados.length; i++) {
                let imagem = await Database.executeQuery(`SELECT * FROM imagens WHERE imagens.produtoId = ${produtosMapeados[i].id} LIMIT 1`);
                produtosMapeados[i].imagem = imagem[0].imagem;
            }
            res.status(200).json({
                error: false,
                message: "Produtos recuperados!",
                produtos: produtosMapeados
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                error: true,
                message: "Falha ao buscar produtos",
                stack: e
            });
        }
    }

    static async getProduto(req, res) {
        const {id} = req.params;

        try {
            let response = (await Database.executeQuery(`SELECT * FROM produtos WHERE id = ${id}`))[0];
            let imagens = await Database.executeQuery(`SELECT * FROM imagens WHERE produtoId = ${id}`);
            response.imagens = [];
            for(let i = 0; i < imagens.length; i++) {
                response.imagens.push(imagens[i].imagem);
            }

            response.imagem = response.imagens[0];

            console.log(response);
            res.status(200).json({
                error: false,
                message: "Sucesso ao buscar produto!",
                result: response
            });
        } catch(e) {
            console.log(e);
            res.status(500).json({
                error: true,
                message:"Erro ao buscar produto",
                stack: e
            });
        }
    }
}