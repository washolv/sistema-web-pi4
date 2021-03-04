import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Produto } from 'src/app/produto/produto/models/produto';
import { ProdutoComponent } from 'src/app/produto/produto/produto.component';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {
  public produto: Produto = new Produto;
  constructor(private produtoService: ProdutoService, public router: Router, public dialogRef: MatDialogRef<AdicionarProdutoComponent>) {

  }


  public addProduto() {
    this.produtoService.postProduto(this.produto).subscribe((response: any) => {
      if(response){
        this.closeModal();
        this.router.navigate(['']);
      }
    });

  }
  public closeModal() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
