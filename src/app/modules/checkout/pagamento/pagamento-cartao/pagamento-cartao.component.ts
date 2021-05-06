import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento-cartao',
  templateUrl: './pagamento-cartao.component.html',
  styleUrls: ['./pagamento-cartao.component.css']
})
export class PagamentoCartaoComponent implements OnInit {
  parcelas: any[]= new Array([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]);
  constructor() { }

  ngOnInit() {
  }

}
