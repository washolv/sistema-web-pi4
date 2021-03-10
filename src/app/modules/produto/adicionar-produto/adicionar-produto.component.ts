import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../models/Produto';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})

export class AdicionarProdutoComponent implements OnInit {
  public produto: Produto = new Produto();
  public produtoRetorno = new Produto();
  public images = [];
  public files = [];
  public imageData: any;
  constructor(private produtoService: ProdutoService, public router: Router) {
    this.produto.status=0;
  }

  ngOnInit() {
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

  public addProduto() {
      this.produtoService.postProduto(this.produto).subscribe((response: any) => {
        if (response) {
          this.produtoRetorno = response;
          this.SalveImage(this.produtoRetorno.id!)
        }
      });
  }

  toggleVisibility(e: any, produto: Produto) {
    if (e.target.checked) {
      produto.status = 1;
    } else {
      produto.status = 0;
    }
  }

  processFile(event: any) {
    this.files = event.target.files;
  }
  backProdutos(){
    this.router.navigate(['produtos']);
  }
}
