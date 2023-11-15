import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ApiService } from '../services/api.service';
import {Produto} from '../models/Produto';
import { ProdutoMountService } from '../services/produto-mount.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    @ViewChild('swiper') swiperEl!: ElementRef;
    isProfileOptsOpen: boolean = false;
    profileTimeout: any = null;

    options: SwiperOptions = {
    slidesPerView: 1,
    loop: true,
    pagination: true
    };

    swiper: Swiper | null = null;

    produtos: Produto[] = [];

    carouselSlides = [
    {
    imgSrc: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3957/banner_img.jpg&w=1920&h=400&q=100'
    },
    {
    imgSrc: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3933/banner_img.jpg&w=1920&h=400&q=100'
    },
    {
    imgSrc: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3949/banner_img.jpg&w=1920&h=400&q=100'
    },
    {
    imgSrc: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3934/banner_img.jpg&w=1920&h=400&q=100'
    }
    ];

    ready: boolean = false;

    constructor(private http: HttpClient, private apiService: ApiService, private produtoMountService: ProdutoMountService) {}

    async ngOnInit() {
        this.ready = false;
        this.http.get("http://localhost:3000/home", {
            headers: {
                token: localStorage.getItem("token")!
            }
        })
        .subscribe(res => {
            console.log(res);  
        })

        await this.getProdutos();
    }

    openProfileOpts() {
        if (!this.isProfileOptsOpen) {
            this.isProfileOptsOpen = true;
            this.profileTimeout = setTimeout(() => {
                this.isProfileOptsOpen = false;
            }, 3000);
        } else {
            this.isProfileOptsOpen = false;
            clearTimeout(this.profileTimeout);
        }
    }

    async getProdutos() {
        await this.apiService.get("listar-produtos")
        .then(async res => {
            let res2: any = res;
            res2.produtos.forEach(async (produto: any) => {
                this.produtos.push(await this.produtoMountService.mountProduto(produto));
            })
            this.ready = true;
        })
        .catch(err => {
            console.log(err);
        })
    }

}

interface ListarProdutos {
    produtos: any[]
}
