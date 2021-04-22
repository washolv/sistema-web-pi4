import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Produto } from '../../produto/models/Produto';
import { DetalhesVenda, Venda } from '../models/Venda';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public produtosCarrinho!: any;
  public qtdProdutos: number = 1;
  public subTotal: number = 0;
  public valorTotal: number = 0;
  public venda: Venda = new Venda;
  constructor(private router: Router, private cartService: CartService) {

  }

  ngOnInit() {
    this.produtosCarrinho = this.cartService.buscarProdutos();
    this.valorTotal = this.cartService.valorTotal(this.produtosCarrinho);
    this.venda.detalhesVenda = [];

    /* for(let prod of this.produtosCarrinho){
       let detalhe:DetalhesVenda=new DetalhesVenda()
       detalhe.produto=prod;
       detalhe.quantidade;
       detalhe.subtotal=<number> prod.preco *detalhe.quantidade!;
       this.venda.detalhesVenda;
       console.log(detalhe)
     }*/
    /*export class Venda {
      id?: number;
      dataVenda?: Date;
      valorTotal?: number;
      enderecoCliente?: EnderecoCliente;
      cliente?: Cliente;
      detalhesVenda?:DetalhesVenda[]=[];
    }

    export class DetalhesVenda {
      id?: number;
      quantidade?:number;
      subtotal?: number;
      produto?: Produto;
    }*/

  }
  remover(produto: Produto) {
    this.cartService.removerProduto(produto);
    window.location.reload();
  }

  endereco() {
    this.router.navigate(['/carrinho/endereco-entrega']);
  }
}
