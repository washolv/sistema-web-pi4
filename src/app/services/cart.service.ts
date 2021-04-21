import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Produto } from '../modules/produto/models/Produto';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient, private produtoService: ProdutoService, private sanitizer: DomSanitizer) { }

  public buscarProdutos() {
    let produtosCarrinhoJson = localStorage.getItem('carrinho');
    let produtosCarrinho: Produto[] = new Array();
    if (produtosCarrinhoJson) {
      let listaId: number[] = JSON.parse(produtosCarrinhoJson);
      listaId.forEach(x => {
        this.produtoService.getProdutoById(x).subscribe(resp => {
          this.produtoService.getImagensProduto(resp.id!).subscribe(response => {
            resp.imagens = response;
            response.forEach(element => {
              resp.imageToShow = new Array()
              resp.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
            })
          })
          produtosCarrinho.push(resp);
        })
      });
    }
    return produtosCarrinho;
  }
  public valorTotal(produtos: Produto[]):number{
    let soma=0;
    produtos.forEach(x=>{
      if(x && x.preco)
      soma=soma+x.preco;
    })
    return soma;
  }
  public qtdProdutos(produtos: Produto[]):number{
    let soma=0;
    produtos.forEach(x=>{
      if(x && x.preco)
      soma=soma+x.preco;
    })
    return soma;
  }
  public adicionarProduto(produto: Produto) {
    let produtosCarrinhoJson = localStorage.getItem('carrinho');
    if (produtosCarrinhoJson) {
      console.log(produtosCarrinhoJson)

      let produtosCarrinho = JSON.parse(produtosCarrinhoJson);
      produtosCarrinho.push(produto.id)

      produtosCarrinhoJson = JSON.stringify(produtosCarrinho);

      localStorage.setItem('carrinho', produtosCarrinhoJson!);
    } else {
      let produtoCarrinho: number[] = new Array();
      produtoCarrinho.push(produto.id!)
      console.log(produtoCarrinho)
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
  public removerProduto(produto: Produto) {
    let produtosCarrinhoJson = localStorage.getItem('carrinho');
    if (produtosCarrinhoJson) {
      let produtosCarrinho = <number[]>JSON.parse(produtosCarrinhoJson);
      produtosCarrinho = produtosCarrinho.filter(x => x != produto.id)

      produtosCarrinhoJson = JSON.stringify(produtosCarrinho);

      localStorage.setItem('carrinho', produtosCarrinhoJson!);
    }
  }

}
