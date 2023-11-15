export class Produto {
    id: number;
    nome: string;
    categoria: string;
    preco: string;
    descricao: string;
    disponivel: boolean;
    marca: string;
    imagem: string;
    imagens: string[] | null;

    constructor(id: number, nome: string, categoria: string, preco: string, descricao: string, disponivel: boolean, marca: string, imagem: string, imagens: string[] | null = null) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.preco = preco;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.marca = marca;
        this.imagem = imagem;
        this.imagens = imagens;
    }
}


export class ProdutoCarrinho extends Produto {
    private quantidade: number = 1;

    constructor(produto: Produto, quantidade: number | null = null) {
        super(produto.id, produto.nome, produto.categoria, produto.preco, produto.descricao, produto.disponivel, produto.marca, produto.imagem, produto.imagens);
        if (quantidade != null) {
            this.quantidade = quantidade;
        }
    }

    getQuantidade() {
        return this.quantidade;
    }

    aumentarQuantidade() {
        this.quantidade += 1;
    }

    diminuir() {
        if (this.quantidade > 1) {
            this.quantidade -= 1;
        }
    }

    getPrecoTotal() {
        return (this.quantidade * Number.parseFloat(this.preco.substring(2)));
    }
}

