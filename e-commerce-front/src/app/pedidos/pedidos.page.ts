import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import PedidoItem from '../models/PedidoItem';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

    constructor(private apiService: ApiService) { }

    pedidos: any[] = [];

    ngOnInit() {
        this.getPedidos();
    }

    async getPedidos() {
        this.pedidos = (await this.apiService.get("listar-pedidos")).pedidos;
        console.log(this.pedidos);
        
    }


    trataData(data: string) {
        return this.sqlDateTime(new Date(data));
    }

    sqlDateTime(date: Date): string {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}