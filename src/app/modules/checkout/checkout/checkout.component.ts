import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Produto } from '../../produto/models/Produto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public produtosCarrinho!: Produto[];
  public qtdProdutos: number=1;
  public subTotal: number=0;
  constructor(private router: Router, private cartService: CartService){
  }

  ngOnInit(){
    this.produtosCarrinho=this.cartService.buscarProdutos();
  }
  remover(produto: Produto){
      this.cartService.removerProduto(produto);
      window.location.reload();
  }
}
