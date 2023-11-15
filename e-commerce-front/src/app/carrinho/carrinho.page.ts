import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';
import {Produto, ProdutoCarrinho} from '../models/Produto';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import PedidoItem from '../models/PedidoItem';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

    produtosCarrinho: ProdutoCarrinho[];

  constructor(private carrinhoService: CarrinhoService, private activeRoute: ActivatedRoute, private apiService: ApiService, private navCtrl: NavController) {
    this.produtosCarrinho = this.carrinhoService.getProdutos();
  }

  ngOnInit() {
    
  }

    async finalizarPedido() {
        try {
            await this.apiService.post("criar-pedido", {
                dataPedido: this.sqlDateTime(new Date(Date.now())),
                precoTotal: this.precoTotalCarrinho().toString(),
                items: this.produtosCarrinho
            });

            await this.carrinhoService.clearCarrinho();
            alert("Pedido criado com sucesso!");
            this.navCtrl.navigateRoot("home");

        } catch(e) {
            console.log(e);
            alert("Erro ao finalizar pedido");
        }
    }

    sqlDateTime(date: Date): string {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

  async deleteProduto(produto: ProdutoCarrinho) {
    this.carrinhoService.removeProduto(produto.id);
  }

  aumentaQtd(produto: ProdutoCarrinho) {
    produto.aumentarQuantidade();
    this.carrinhoService.salvarItensStorage();
  }

  diminuiQtd(produto: ProdutoCarrinho) {
    produto.diminuir();
    this.carrinhoService.salvarItensStorage();
  }

  precoTotalCarrinho() {
    return this.produtosCarrinho.reduce((prev, curr) => {
        return prev + curr.getPrecoTotal();
    }, 0)
  }

}
