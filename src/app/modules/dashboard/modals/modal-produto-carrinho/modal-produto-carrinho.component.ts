import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-modal-produto-carrinho',
  templateUrl: './modal-produto-carrinho.component.html',
  styleUrls: ['./modal-produto-carrinho.component.css']
})
export class ModalProdutoCarrinhoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cartService: CartService,private router: Router,public dialogRef: MatDialogRef<ModalProdutoCarrinhoComponent>) { }

  ngOnInit() {
  }

  carrinho(){
    this.dialogRef.close();
    this.cartService.adicionarProduto(this.data.produto);
    this.router.navigate(['/carrinho']);
  }

  dashboard(){
    this.dialogRef.close();
    this.cartService.adicionarProduto(this.data.produto);
    this.router.navigate(['/dashboard']);
  }

}
