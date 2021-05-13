import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Venda } from '../../models/Venda';

@Component({
  selector: 'app-ModalVendaCadastrada',
  templateUrl: './ModalVendaCadastrada.component.html',
  styleUrls: ['./ModalVendaCadastrada.component.css']
})
export class ModalVendaCadastradaComponent implements OnInit {
  venda: Venda =new Venda();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cartService: CartService,private router: Router,public dialogRef: MatDialogRef<ModalVendaCadastradaComponent>) {
    if(data){
        this.venda=data.produto;
    }
   }

  ngOnInit() {
  }

  pedidos(){
    this.dialogRef.close();
    this.router.navigate(['/configuracoes/meus-pedidos']);
  }

  dashboard(){
    this.dialogRef.close();
    this.router.navigate(['/dashboard']);
  }
}
