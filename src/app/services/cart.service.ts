import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, ɵangular_packages_platform_browser_platform_browser_j } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Carrinho } from '../modules/checkout/models/carrinho';
import { Frete } from '../modules/checkout/models/Frete';
import { Produto } from '../modules/produto/models/Produto';
import { ConsultaCepService } from './consulta-cep.service';
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

  public calculaFrete(cep: string): Frete[]{
    let fretes=new Array();
    var res = cep.charAt(0);
   switch(res){
    case '0':
      fretes.push('SEDEX',5.66)
      fretes.push('LOGGI', 12.52)
      fretes.push('TlgFast', 30.15)
      break;
    case '1':
      fretes.push('SEDEX',10.99)
      fretes.push('LOGGI', 20.22)
      fretes.push('TlgFast', 30.15)
      break;
    case '2':
      fretes.push('SEDEX',15.52)
      fretes.push('LOGGI', 22.15)
      fretes.push('TlgFast', 40.00)
      break;
    case '3':
      fretes.push('SEDEX',8.99)
      fretes.push('LOGGI', 12.85)
      fretes.push('TlgFast', 26.10)
      break;
    case '4':
      fretes.push('SEDEX',11.99)
      fretes.push('LOGGI', 8.99)
      fretes.push('TlgFast', 22.63)
      break;
    case '5':
      fretes.push('SEDEX',10.99)
      fretes.push('LOGGI', 20.22)
      fretes.push('TlgFast', 30.15)
      break;
    case '6':
      fretes.push('SEDEX',45.44)
      fretes.push('LOGGI', 46.55)
      fretes.push('TlgFast', 60.88)
      break;
    case '7':
      fretes.push('SEDEX',25.89)
      fretes.push('LOGGI', 20.00)
      fretes.push('TlgFast', 30.85)
      break;
    case '8':
      fretes.push('SEDEX',12.99)
      fretes.push('LOGGI', 19.65)
      fretes.push('TlgFast', 36.85)
      break;
    case '9':
      fretes.push('SEDEX',10.23)
      fretes.push('LOGGI', 14.66)
      fretes.push('TlgFast', 29.52)
      break;
   }
   return fretes;
  }

}
