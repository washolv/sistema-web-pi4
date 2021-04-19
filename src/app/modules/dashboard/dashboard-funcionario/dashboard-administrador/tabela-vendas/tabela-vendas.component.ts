import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Venda } from 'src/app/modules/checkout/models/Venda';
import { RelatorioVendasService } from 'src/app/services/relatorio-vendas.service';

@Component({
  selector: 'app-tabela-vendas',
  templateUrl: './tabela-vendas.component.html',
  styleUrls: ['./tabela-vendas.component.css']
})
export class TabelaVendasComponent implements OnInit {
  public vendas: Venda[]=[];

  orderByConfig = {
    orderKey: 'Sequencia',
    reverse: false,
    isCaseInsensitive: true
};
  constructor(private router: Router, relatorioVendasService: RelatorioVendasService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if(this.data.vendas){
      this.vendas=this.data.vendas;
    }
   }

  ngOnInit() {
  }

  modalProdutos(id?: number){

  }
  sort(key: string) {
    this.orderByConfig.orderKey = key;
    this.orderByConfig.reverse = !this.orderByConfig.reverse;
}
}
