import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { ModalExcluirProdutoComponent } from './modals/modal-excluir-produto/modal-excluir-produto.component';
import { Produto } from './models/Produto';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { LOCALE_ID } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  public produtos: Produto[] = [];
  public filtroPesquisa: string = "";
  searchFilter = new Subject<string>();
  color: ThemePalette = 'primary';

  totalRegistros: number=0;
  page: number=1
  teste: boolean=false;

  constructor(private dialog: MatDialog, private router: Router, public produtoService: ProdutoService) {
    this.searchFilter.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.produtoService.getProdutoByDescricao(search)
          .subscribe((response: Produto[]) => {
            if (response) {
              this.produtos = response;
            }
          });
      });
  }

  public habilitarProduto(p: Produto) {
      if (p.status) {
        p.status = 1;
      } else {
        p.status = 0;
      }
      this.produtoService.editarProduto(p).subscribe((response: any) => {
        if (response) {
          console.log(response)
        }
      });
  }
  ngOnInit() {
    this.produtoService.getProdutos()
      .subscribe((response: Produto[]) => {
        this.produtos = response;
        this.totalRegistros=this.produtos.length;
        console.log(this.totalRegistros);
      }, err => {
        console.log(err);
      });
  }



  adicionarProduto() {
    this.router.navigate([`/produtos/adicionar`]);
  }

  excluirProduto(produto: Produto) {
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
    } else {
      produto.status = 0;
    }
  }
  editarProduto(produto: Produto) {
    this.router.navigate([`/produtos/editar`, produto.id]);
  }
  visualizar(produto: Produto) {
    this.router.navigate([`/produtos/visualizar`, produto.id]);
  }
}



