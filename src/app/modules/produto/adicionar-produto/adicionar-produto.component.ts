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
  public imageData: any;
  constructor(private produtoService: ProdutoService, public router: Router) {
    this.produto.status=0;
  }

  ngOnInit() {
  }

  public addProduto() {
    this.router.navigateByUrl('/produtos/adicionar/imagens', {
      state: { produto: this.produto }
      })
  }

  toggleVisibility(e: any, produto: Produto) {
    if (e.target.checked) {
      produto.status = 1;
    } else {
      produto.status = 0;
    }
  }

  backProdutos(){
    this.router.navigate(['produtos']);
  }

}
