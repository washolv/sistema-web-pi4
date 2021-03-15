import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../produto/models/Produto';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent implements OnInit {

  public produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {

   }

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(response => {
      this.produtos = response,
      this.produtos.forEach(produto => {
        this.produtoService.getImagensProduto(produto.id!).subscribe( response => {
          produto.imagens = response
          console.log(produto)
        })
      });
    });
  }

}
