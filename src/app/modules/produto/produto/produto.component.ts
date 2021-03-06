import { ToastrService } from 'ngx-toastr';
import { AdicionarEstoqueComponent } from './../modals/adicionar-estoque/adicionar-estoque.component';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { ModalExcluirProdutoComponent } from '../modals/modal-excluir-produto/modal-excluir-produto.component';
import { Produto } from '../models/Produto';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { LOCALE_ID } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { HttpResponse } from '@angular/common/http';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  public modalRef: BsModalRef | undefined;
  public produtos: Produto[] = [];
  public filtroPesquisa: string = "";
  searchFilter = new Subject<string>();
  color: ThemePalette = 'primary';
  userRole?:string;
  totalRegistros: number=0;
  page: number=1
  teste: boolean=false;
  isAdmin=false;


  constructor(private roleGuardService: RoleGuardService,private dialog: MatDialog, private router: Router, public produtoService: ProdutoService, private modalService: BsModalService, private toastr: ToastrService) {
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
      this.userRole=this.roleGuardService.getUserRole();
      this.isAdmin=this.userRole=='ROLE_ADMIN';
  }

  ngOnInit() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    this.produtoService.getProdutos()
      .subscribe((response: HttpResponse<Produto[]>) => {
        this.produtos = <Produto[]> response.body;
        this.totalRegistros=this.produtos.length;
        dialogRef.close();
      }, err => {
        console.log(err);
      });
  }
  public habilitarProduto(p: Produto) {
    if(this.userRole=='ROLE_ADMIN'){
      if (p.status) {
        p.status = 1;
      } else {
        p.status = 0;
      }
      this.produtoService.editarProduto(p).subscribe((response: any) => {
      });
    }
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

  adicionarEstoque(produto: Produto) {
    const dialogRef = this.dialog.open(AdicionarEstoqueComponent, {

      data: {
        produto: produto
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.produtoService.editarProduto(response).subscribe(response => {
          this.toastr.success("Quantidade atualizada com sucesso!", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }, err => {
          this.toastr.error("Falha ao alterar estoque", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        })
      }
    }, err => {
      console.log(err);
    });
  }

}



