import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProfileOptionsComponent } from '../components/profile-options/profile-options.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabsComponentModule } from '../components/tabs/tabs.component.module';
import { ProductItemComponent } from '../components/product-item/product-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TabsComponentModule
  ],
  declarations: [HomePage, ProfileOptionsComponent, ProductItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
