import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoPageRoutingModule } from './produto-routing.module';

import { ProdutoPage } from './produto.page';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabsComponentModule } from '../components/tabs/tabs.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoPageRoutingModule,
    TabsComponentModule
  ],
  declarations: [ProdutoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProdutoPageModule {}
