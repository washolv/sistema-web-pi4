import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CartService } from 'src/app/services/cart.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../produto/models/Produto';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Carrinho } from '../models/carrinho';
import { DetalhesVenda, Venda } from '../models/Venda';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public produtosCarrinho: Produto[] = [];
  public qtdProdutos: number = 1;
  public subTotal: number = 0;
  public valorTotal: number = 0;
  public venda: Venda = new Venda;
  public teste=moment().startOf('day')
  public listaProdutosCarrinho: Carrinho[] = [];
  constructor(private dialog: MatDialog, private produtoService: ProdutoService, private router: Router, private cartService: CartService,
    private sanitizer: DomSanitizer) {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    this.venda.valorTotal = 0;
    let produtosCarrinhoJson = localStorage.getItem('carrinho');
    if (produtosCarrinhoJson) {
      this.listaProdutosCarrinho = JSON.parse(produtosCarrinhoJson);
    }
    this.buscarProdutos();
    this.calculaTotal();
    dialogRef.close();
  }

  ngOnInit() {
    this.venda.detalhesVenda = [];
  }
  buscarProdutos() {
    this.listaProdutosCarrinho.forEach(x => {
        this.produtoService.getProdutoById(x.id!).subscribe(produto => {
          this.produtoService.getImagensProduto(produto.id!).subscribe(response => {
            produto.imagens = response;
            response.forEach(element => {
              produto.imageToShow = [];
              produto.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)));
            })
          })
          let itemCarrinho: DetalhesVenda = new DetalhesVenda();
          itemCarrinho.produto = produto;
          itemCarrinho.quantidade = x.quantidade;
          itemCarrinho.subTotal = produto.preco!*x.quantidade!;
          this.venda.detalhesVenda?.push(itemCarrinho);
          this.venda.valorTotal = this.venda.valorTotal! + itemCarrinho.subTotal;
          this.venda.quantidadeTotal! += x.quantidade!;
        })
      });
  }
  remover(produto: Produto) {
    this.cartService.removerProduto(produto.id!);
    window.location.reload();
  }

  plus(index: number) {
    let qtd = <number>this.venda.detalhesVenda![index].quantidade;
    let subTotal = this.venda.detalhesVenda![index].subTotal!;
    let estoque = this.venda.detalhesVenda![index].produto!.quantidadeEstoque;
    if (qtd < estoque!) {
      let qtd = <number>this.venda.detalhesVenda![index].quantidade;
      let preco = this.venda.detalhesVenda![index].produto?.preco;
      this.venda.detalhesVenda![index].quantidade = qtd + 1;
      this.venda.detalhesVenda![index].subTotal = (qtd + 1) * preco!;
      this.venda.quantidadeTotal! += 1;
      this.calculaTotal();
      this.cartService.adicionarProduto(this.venda.detalhesVenda![index]!.produto!.id!, qtd+1);
    }
  }

  minus(index: number) {
    let qtd = <number>this.venda.detalhesVenda![index].quantidade;
    let subTotal = this.venda.detalhesVenda![index].subTotal!;
    if (qtd > 1) {
      let preco = this.venda.detalhesVenda![index].produto?.preco;
      this.venda.detalhesVenda![index].quantidade = qtd! - 1;
      this.venda.detalhesVenda![index].subTotal = subTotal - preco!;
      this.venda.quantidadeTotal! -= 1;
      this.calculaTotal();
      this.cartService.adicionarProduto(this.venda.detalhesVenda![index]!.produto!.id!, qtd-1)
    }
  }

  calculaTotal() {
    this.venda.valorTotal = 0;
    this.venda.detalhesVenda!.forEach(sub => {
      this.venda.valorTotal = sub.subTotal! + this.venda.valorTotal!;
    })
  }
  endereco() {
    this.router.navigateByUrl('/carrinho/endereco-entrega', {
      state: { venda: this.venda }
    })
  }
}
