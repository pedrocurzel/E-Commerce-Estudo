import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {

    @Input() currentPage: string = '';

  constructor(private router: Router, private nav: NavController, public carrinhoService: CarrinhoService) { }

  ngOnInit() {}

  navigate(page: string) {
    //this.router.navigateByUrl(`/${page}`, { replaceUrl: true,  });
    page = '/' + page;
    this.nav.navigateRoot(page)
  }

}
