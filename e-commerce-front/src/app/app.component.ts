import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { StorageService } from './services/storage.service';
import { CarrinhoService } from './services/carrinho.service';
import { ProdutoMountService } from './services/produto-mount.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private storage: StorageService, private carrinhoService: CarrinhoService, private mount: ProdutoMountService) {}

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    this.carrinhoService.retrieveItemsFromStorage(this.mount.mountArrayProdutosCarrinho(JSON.parse(await this.storage.get("produtos-carrinho"))));
  }
}
