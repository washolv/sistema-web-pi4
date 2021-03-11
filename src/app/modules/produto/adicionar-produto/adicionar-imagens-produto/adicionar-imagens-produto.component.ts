import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'app-adicionar-imagens-produto',
  templateUrl: './adicionar-imagens-produto.component.html',
  styleUrls: ['./adicionar-imagens-produto.component.css']
})
export class AdicionarImagensProdutoComponent implements OnInit {
  public produto: Produto;
  nav: any;
  public files = [];
  public preVisualizacao: any=new Array();
  produtoRetorno = new Produto();
  constructor(private produtoService: ProdutoService, private router: Router) {
    this.nav = router.getCurrentNavigation();
    this.produto = this.nav.extras.state.produto;
  }


  ngOnInit() {
    console.log(this.produto);
  }

  processFile(event: any) {
    this.files = event.target.files;
    console.log(this.files);

    for (let file of this.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file),
        reader.onload = event => {
          this.preVisualizacao.push(reader.result);
        }
    }
  }

  addProduto() {
    this.produtoService.postProduto(this.produto).subscribe((response: any) => {
      if (response) {
        this.produtoRetorno = response;
        this.SalveImage(this.produtoRetorno.id!)
      }
    })
  }
  SalveImage(id: number) {
    let uploadImageData = new FormData();

    for (const file of this.files) {
      uploadImageData.append('file', file);
    }
    this.produtoService.postFotoProduto(uploadImageData, id).subscribe((response: any) => {
      if (response) {
        console.log(response)
      }
    });
  }
   deleteImage(url: any): void {
    this.preVisualizacao = this.preVisualizacao.filter((a: any) => a !== url);
  }



}
