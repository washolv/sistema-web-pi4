import { Component, Injectable, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { pipe, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../produto/models/Produto';

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
  public filtroPesquisa: string = "";
  public currentRate=1;

  constructor(private config: NgbRatingConfig,private router: Router, private sanitizer: DomSanitizer, private produtoService: ProdutoService) {
    this.config.max=5;
    this.searchFilter.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.produtoService.getProdutoByDescricao(search)
          .subscribe((response: Produto[]) => {
            this.produtos = response;
            this.produtos.forEach(produto => {
              produto.imageToShow = [];
              this.produtoService.getImagensProduto(produto.id!).subscribe(response => {
                console.log(produto.id)
                response.forEach(element =>
                  produto.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
                )
              }
              )
            });
          });
      });
  }

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(response => {
      this.produtos = response,
        this.produtos.forEach(produto => {
          produto.imageToShow = [];
          this.produtoService.getImagensProduto(produto.id!).subscribe(response => {
            console.log(produto.id)
            response.forEach(element =>
              produto.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
            )
          }
          )
        });
    });
  }
  Detalhes(id: number) {
    this.loading = true;
    pipe(first())
    {
      this.router.navigate(['/produtos/visualizar', id]);
    }

  }
}
