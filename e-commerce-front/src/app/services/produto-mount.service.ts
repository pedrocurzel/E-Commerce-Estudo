import { Injectable } from '@angular/core';
import {Produto, ProdutoCarrinho} from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoMountService {

  constructor() { }

  mountProduto(produto: any): Produto {    
    return new Produto(produto.id, produto.nome, produto.categoria, produto.preco, 
        produto.descricao, produto.disponivel, produto.marca, produto.imagem, produto.imagens ? produto.imagens : null);
  }

  mountArrayProdutosCarrinho(produtosObj: any[]): ProdutoCarrinho[] {
    if (produtosObj) {
        return produtosObj.map(produto => {
            let produtoMontado =  this.mountProduto(produto);
            return new ProdutoCarrinho(produtoMontado, produto.quantidade);
        });
    }
    return [];
  }
}
