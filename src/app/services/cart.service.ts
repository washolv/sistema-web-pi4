import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Carrinho } from '../modules/checkout/models/carrinho';
import { Produto } from '../modules/produto/models/Produto';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient, private produtoService: ProdutoService, private sanitizer: DomSanitizer) { }


  public adicionarProduto(id:number, quantidade: number) {
    let produtosCarrinhoJson = localStorage.getItem('carrinho');

    if (produtosCarrinhoJson) {
      produtosCarrinhoJson = localStorage.getItem('carrinho');
      let produtosCarrinho = <Carrinho[]> JSON.parse(produtosCarrinhoJson!);
      let prodCarrinho = <Carrinho[]> produtosCarrinho.filter(x => x.id == id)
      if(prodCarrinho[0] && prodCarrinho[0].id==id){
        let produtos = <Carrinho[]> produtosCarrinho.filter(x => x.id != id)
        prodCarrinho[0].quantidade=prodCarrinho[0].quantidade!+1;
        produtos.push(prodCarrinho[0])
        produtosCarrinhoJson = JSON.stringify(produtos);

        localStorage.setItem('carrinho', produtosCarrinhoJson!);
      }else{
        produtosCarrinho.push(new Carrinho(id, quantidade))
        produtosCarrinhoJson = JSON.stringify(produtosCarrinho);
        localStorage.setItem('carrinho', produtosCarrinhoJson!);
      }

    } else {
      let produtoCarrinho: Carrinho[] = new Array();
      produtoCarrinho.push(new Carrinho(id, quantidade))
      localStorage.setItem('carrinho', JSON.stringify(produtoCarrinho));
    }
  }
  public qtdCarrinho() {
    let produtosCarrinhoJson = localStorage.getItem('carrinho');
    if (produtosCarrinhoJson) {
      let produtosCarrinho = JSON.parse(produtosCarrinhoJson);
      const unique = produtosCarrinho.map((x: any) => x).filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index)
      return unique.length;
    }
    return 0;
  }
  public removerProduto(id: number) {
    let produtosCarrinhoJson = localStorage.getItem('carrinho');
    if (produtosCarrinhoJson) {
      let produtosCarrinho = <Carrinho[]>JSON.parse(produtosCarrinhoJson);
      produtosCarrinho = produtosCarrinho.filter(x => x.id != id)
      produtosCarrinhoJson = JSON.stringify(produtosCarrinho);
      localStorage.setItem('carrinho', produtosCarrinhoJson!);
    }
  }

}
