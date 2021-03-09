import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { ModalAdicionarProdutoComponent } from './modals/modal-adicionar-produto/modal-adicionar-produto.component';
import { ModalEditarProdutoComponent } from './modals/modal-editar-produto/modal-editar-produto.component';
import { ModalExcluirProdutoComponent } from './modals/modal-excluir-produto/modal-excluir-produto.component';
import { Produto } from './models/Produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  public produtos: Produto[] =[];
  public filtroPesquisa: string="";
  constructor(private dialog: MatDialog, private router: Router, public produtoService: ProdutoService) { }

  ngOnInit() {
    console.log('*********');
    this.produtoService.getProdutos()
      .subscribe((response: Produto[]) => {
        this.produtos = response;
      }, err => {
        console.log(err);
      });
    console.log(this.produtos);
  }

  adicionarProduto() {
    const dialogRef = this.dialog.open(ModalAdicionarProdutoComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: '430px', width: '550px',

    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
       // this.produto = response;
      }
    }, err => {
      console.log(err);
    });
  }

  excluirProduto(produto: Produto) {
    console.log(produto);
    const dialogRef = this.dialog.open(ModalExcluirProdutoComponent , {
      panelClass: 'custom-modais', backdropClass: 'blur',
        data:{
          prod:produto
        }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
       // this.produto = response;
      }
    }, err => {
      console.log(err);
    });
  }

  editarProduto(produto: Produto) {
    const dialogRef = this.dialog.open(ModalEditarProdutoComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: '800x', width: '1000px',
      data:{
        prod: produto
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
       // this.produto = response;
      }
    }, err => {
      console.log(err);
    });
  }
}


