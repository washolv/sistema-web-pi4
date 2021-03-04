import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { AdicionarProdutoComponent } from '../modals/modal-adicionar-produto/adicionar-produto/adicionar-produto.component';
import { Produto } from './models/produto';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})


export class ProdutoComponent implements OnInit {
  public produtos: Produto[] = [];
  public produto: Produto=new Produto();

  constructor(private dialog: MatDialog, private router: Router, public produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.getProdutos()
      .subscribe((response: Produto[]) => {
        this.produtos = response;
      }, err => {
        console.log(err);
      });
    console.log(this.produtos);
  }
  adicionarProduto() {
    const dialogRef = this.dialog.open(AdicionarProdutoComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: '430px', width: '550px',

    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.produto = response;
      }
    }, err => {
      console.log(err);
    });
  }


}
