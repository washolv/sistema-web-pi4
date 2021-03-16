import { Component, Injectable, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../produto/models/Produto';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})

export class VitrineComponent implements OnInit {

  public produtos: Produto[] = [];
  imageToShow: SafeResourceUrl[]=[];
  imagens:any;
  constructor(private sanitizer: DomSanitizer,private produtoService: ProdutoService) {
    this.produtoService.getProdutos().subscribe(response => {
      this.produtos = response,
      this.produtos.forEach(produto => {
        produto.imageToShow=[];
        this.produtoService.getImagensProduto(produto.id!).subscribe( response => {
          console.log(produto.id)
          response.forEach(element =>
            produto.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
          )
        }
        )
      });
    });
   }

  ngOnInit() {

  }

}
