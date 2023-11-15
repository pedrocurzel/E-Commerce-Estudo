import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto, ProdutoCarrinho } from '../models/Produto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

    produtosCarrinho: BehaviorSubject<ProdutoCarrinho[]> = new BehaviorSubject<ProdutoCarrinho[]>([]);

  constructor(private storage: StorageService) { }

  getProdutos() {
    return this.produtosCarrinho.value;
  }

  async addProduto(produto: Produto) {
    console.log(produto);
    
    if (this.produtosCarrinho.value.find(produtoFind => produtoFind.id == produto.id)) {
        alert("Este produto já está no carrinho!");
        return;
    }

    let produtoCarrinho = new ProdutoCarrinho(produto);

    let produtosAtuais = this.produtosCarrinho.value;
    let produtosNovos = [...produtosAtuais, produtoCarrinho];
    this.produtosCarrinho.next(produtosNovos);
    await this.storage.set("produtos-carrinho", JSON.stringify(produtosNovos));
  }

  async removeProduto(produtoId: number) {
    let produtos = this.produtosCarrinho.value;
    let indexDeletar = produtos.findIndex(produto => {
        return produto.id == produtoId
    });
    produtos.splice(indexDeletar, 1);
    this.produtosCarrinho.next(produtos);
    await this.storage.set("produtos-carrinho", JSON.stringify(produtos));
  }

  async retrieveItemsFromStorage(produtosStorage: ProdutoCarrinho[]) {
    this.produtosCarrinho.next(produtosStorage);
  }

  async salvarItensStorage() {
    await this.storage.set("produtos-carrinho", JSON.stringify(this.produtosCarrinho.value));
  }

  async clearCarrinho() {
    this.produtosCarrinho.next([]);
    await this.storage.clear();
  }
}
