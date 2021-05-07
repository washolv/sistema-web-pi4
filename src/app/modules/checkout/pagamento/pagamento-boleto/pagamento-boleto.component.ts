import { Component, Input, OnInit } from '@angular/core';
import { Venda } from '../../models/Venda';

@Component({
  selector: 'app-pagamento-boleto',
  templateUrl: './pagamento-boleto.component.html',
  styleUrls: ['./pagamento-boleto.component.css']
})
export class PagamentoBoletoComponent implements OnInit {
  @Input() venda: Venda=new Venda();
  desconto:number=0;
  valorTotal:number=0;
  valorComDesconto:number=0;

  constructor() { }

  ngOnInit() {
    let valorVenda=this.venda.valorTotal;
    this.desconto=this.venda.valorTotal!*0.15;
    this.valorTotal=this.venda.valorTotal!;
    this.valorComDesconto=this.venda.valorTotal=this.valorTotal-this.desconto;
    this.venda.valorTotal=valorVenda;
  }

}
