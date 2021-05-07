import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';
import { Cliente } from '../../cliente/models/Cliente';
import { Carrinho } from '../models/carrinho';
import { DetalhesVenda, Venda } from '../models/Venda';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  freteSelecionado: any;
  cliente: Cliente=new Cliente();
  public venda: Venda = new Venda();
  id: number=0;
  tabIndex:number=0;
  listaProdutosCarrinho: Carrinho[]=[];
  constructor(private toastr: ToastrService, private roleGuardService: RoleGuardService,
    private clienteService: ClienteService, private sanitizer: DomSanitizer, private dialog: MatDialog, private router: Router,
    private produtoService: ProdutoService) {
    let frete=sessionStorage.getItem('frete');
    if(frete){
      this.freteSelecionado = JSON.parse(frete);
    }else{
      this.router.navigate(['/endereco-entrega'])
    }
  }

  ngOnInit() {
    let produtos=localStorage.getItem('carrinho');
    if(produtos){
      this.listaProdutosCarrinho = JSON.parse(produtos);
    }else{
      this.router.navigate(['/carrinho'])
    }
    let f=sessionStorage.getItem('frete');
    if(f){
      this.freteSelecionado=JSON.parse(f);
    }
    this.buscarProdutos();
    this.calculaTotal();
    const user = this.roleGuardService.decodeJWT();
    this.id = user.Id;
    this.clienteService.buscarCliente(this.id).subscribe(resp => {
      this.cliente = resp;
    })


  }
  adicionarEnderecoCobranca(){

  }
  buscarProdutos() {
    if(this.listaProdutosCarrinho && this.listaProdutosCarrinho.length>0){
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
          itemCarrinho.subTotal = produto.preco! * x.quantidade!;
          this.venda.detalhesVenda?.push(itemCarrinho);
          this.venda.valorTotal = this.venda.valorTotal! + itemCarrinho.subTotal;
          this.venda.quantidadeTotal! += x.quantidade!;
        })
      });
    }

  }
  calculaTotal() {
    this.venda.valorTotal = 0;
    console.log(this.freteSelecionado)
    this.venda.detalhesVenda!.forEach(sub => {
      this.venda.valorTotal = sub.subTotal! + this.venda.valorTotal!;
    })
    this.venda.valorTotal=this.venda.valorTotal+this.freteSelecionado.valorFrete;
  }
  backPage(){
    this.router.navigate(['/endereco-entrega']);
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tabIndex=tabChangeEvent.index;
  }
  finalizarCompra(){
    this.router.navigate(['/carrinho/resumo-do-pedido'])
  }
}
