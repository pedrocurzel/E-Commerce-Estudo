import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrinhoPageRoutingModule } from './carrinho-routing.module';

import { CarrinhoPage } from './carrinho.page';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabsComponentModule } from '../components/tabs/tabs.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrinhoPageRoutingModule,
    TabsComponentModule
  ],
  declarations: [CarrinhoPage]
})
export class CarrinhoPageModule {}
