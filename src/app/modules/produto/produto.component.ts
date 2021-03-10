import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { ModalAdicionarProdutoComponent } from './modals/modal-adicionar-produto/modal-adicionar-produto.component';
import { ModalEditarProdutoComponent } from './modals/modal-editar-produto/modal-editar-produto.component';
import { ModalExcluirProdutoComponent } from './modals/modal-excluir-produto/modal-excluir-produto.component';
import { Produto } from './models/Produto';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  public produtos: Produto[] = [];
  public filtroPesquisa: string = "";
  searchFilter = new Subject<string>();

  totalRegistros: number=0;
  page: number=1

  constructor(private dialog: MatDialog, private router: Router, public produtoService: ProdutoService) {
    this.searchFilter.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.produtoService.getProdutoByDescricao(search)
          .subscribe((response: Produto[]) => {
            if (response) {
              this.produtos = response;
              this.totalRegistros=this.produtos.length
            }
          });
      });
  }

  ngOnInit() {
    this.produtoService.getProdutos()
      .subscribe((response: Produto[]) => {
        this.produtos = response;
        this.totalRegistros=this.produtos.length;
      }, err => {
        console.log(err);
      });
    console.log(this.produtos);
  }



  adicionarProduto() {
    this.router.navigate([`/produtos/adicionar`]);
  }

  excluirProduto(produto: Produto) {
    console.log(produto);
    const dialogRef = this.dialog.open(ModalExcluirProdutoComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur',
      data: {
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

  toggleVisibility(e: any, produto: Produto) {
    if (e.target.checked) {
      produto.status = 1;
      console.log(produto);
    } else {
      produto.status = 0;
      console.log(produto);
    }
  }
  editarProduto(produto: Produto) {
    this.router.navigate([`/produtos/editar`, produto.id]);
  }
}



