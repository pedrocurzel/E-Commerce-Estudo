export default class PedidoItem {
    pedidoId: number;
    usuarioId: number | null;
    dateTime: string;
    produtoId: number;
    precoTotal: string;
    quantidadeProduto: number;

    constructor(pedidoId: number, usuarioId: number | null, dateTime: string, produtoId: number, precoTotal: string, quantidadeProduto: number) {
        this.pedidoId = pedidoId;
        this.usuarioId = usuarioId;
        this.dateTime = dateTime;
        this.produtoId = produtoId;
        this.precoTotal = precoTotal;
        this.quantidadeProduto = quantidadeProduto;
    }
}