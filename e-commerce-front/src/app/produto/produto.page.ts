import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import {Produto} from '../models/Produto';
import { ProdutoMountService } from '../services/produto-mount.service';
//import { Swiper, SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import Swiper from "swiper";
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

    produtoId: string = '';
    ready: boolean = true;
    produto: Produto | null = null;

    constructor(private activatedRoute : ActivatedRoute, private apiService: ApiService, private produtoMountService: ProdutoMountService, private carrinhoService: CarrinhoService) { }

    async ngOnInit() {
        this.ready = false;
        this.produtoId = this.activatedRoute.snapshot.paramMap.get("id")!;
        await this.getProduto();
        this.ready = true;
    }

    async getProduto() {
        await this.apiService.get(`produto/${this.produtoId}`)
        .then(async res => {
            let result: any = res;
            console.log(result.result);
            
            this.produto = await this.produtoMountService.mountProduto(result.result);
            
        })
    }

    async adicionarCarrinho() {
        this.carrinhoService.addProduto(this.produto!);
    }

}
