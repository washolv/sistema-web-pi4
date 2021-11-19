import { HttpResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, pipe, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, mergeMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../produto/models/Produto';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})

export class VitrineComponent implements OnInit {

  public produtos: Produto[] = [];
  imageToShow: SafeResourceUrl[] = [];
  imagens: any;
  public loading = false;
  searchFilter = new Subject<string>();
  searchCategoria = new Subject<string>();
  public filtroPesquisa: string = "";
  public currentRate = 1;
  slides: any = [[]];
  constructor(private cartService: CartService,private config: NgbRatingConfig, private dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer, private produtoService: ProdutoService) {
    this.config.max = 5;
    this.searchFilter.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.produtoService.getProdutoByDescricao(search, true)
          .subscribe((response: Produto[]) => {
            this.produtos = response;
          });
      });
  }

  ngOnInit() {
    this.filtrarPorCategoria("");
    localStorage.getItem('carrinho');
  }

  chunk(arr: any, chunkSize: number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  filtrarPorCategoria(categoria?: string) {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    if (categoria == "") {
      this.produtoService.getProdutosHabilitados().subscribe((response) => {
        this.produtos = response;
        dialogRef.close();
        this.slides = this.chunk(this.produtos, 4);
      });
    } else {
      this.produtoService.getProdutosHabilitadosPorCategoria(categoria!).subscribe((response) => {
        this.produtos = response;
        dialogRef.close();
      });
    }
  }

  filtrarPorSubCategoria(item: string) {
    this.produtoService.getProdutoByDescricao(item, true)
      .subscribe((response) => {
        this.produtos = response;
      });
  }

  Detalhes(id: number) {
    this.loading = true;
    pipe(first())
    {
      this.router.navigate(['/dashboard/detalhes', id]);
    }
  }
}


