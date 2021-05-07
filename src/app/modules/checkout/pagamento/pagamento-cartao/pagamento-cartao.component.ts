import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Venda } from '../../models/Venda';

@Component({
  selector: 'app-pagamento-cartao',
  templateUrl: './pagamento-cartao.component.html',
  styleUrls: ['./pagamento-cartao.component.css']
})
export class PagamentoCartaoComponent implements OnInit {
  @Input() venda: Venda=new Venda();
  parcelas: any[]=[];
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    for(let i=1; i<=12; i++){
        let valorParcela=this.venda.valorTotal!/i;
        if(i==1){
          valorParcela=valorParcela-(valorParcela*0.1);
        }
        this.parcelas.push({valor: valorParcela, totalParcelas: i});
    }
  }
  setValorVenda(valor: any){
    console.log(valor)
      //this.venda.valorTotal=
  }
}
