import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {Produto} from 'src/app/models/Produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent  implements OnInit {

    @Input() produto: Produto | null = null;

    constructor(private navCtrl: NavController, private carrinho: CarrinhoService, private ref: ChangeDetectorRef) { }

    ngOnInit() {}

    goToProductPage(ev: Event) {
        let elementClicked: HTMLElement  = ev.srcElement! as HTMLElement;
        if (elementClicked.localName == "ion-button") {
            ev.preventDefault();
            return;
        }
        this.navCtrl.navigateForward(`/produto/${this.produto!.id}`)
    }

    adicionar() {
        this.carrinho.addProduto(this.produto!);
    }

}
