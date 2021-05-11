import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';
import { Cliente, EnderecoCliente } from '../../cliente/models/Cliente';
import { ModalVendaCadastradaComponent } from '../modals/ModalVendaCadastrada/ModalVendaCadastrada.component';
import { Carrinho } from '../models/carrinho';
import { DetalhesVenda, Venda } from '../models/Venda';

@Component({
  selector: 'app-resumo-pedido',
  templateUrl: './resumo-pedido.component.html',
  styleUrls: ['./resumo-pedido.component.css']
})
export class ResumoPedidoComponent implements OnInit {
  cliente: Cliente = new Cliente();
  enderecoEntrega = new EnderecoCliente();
  venda = new Venda();
  listaProdutosCarrinho: Carrinho[] = [];
  constructor(private roleGuardService: RoleGuardService, private clienteService: ClienteService, private sanitizer: DomSanitizer, private dialog: MatDialog,
    private router: Router, private produtoService: ProdutoService, private vendaService:VendaService) {
    let endereco = sessionStorage.getItem('endereco-entrega');
    if (endereco) {
      this.enderecoEntrega = JSON.parse(endereco);
    } else {
      this.router.navigate(['/carrinho/endereco-entrega'])
    }
  }

  ngOnInit() {
    let id = <number>this.roleGuardService.getUser().Id;
    this.clienteService.buscarCliente(id).subscribe(response => {
      this.cliente = response;
    });
    let venda = sessionStorage.getItem('venda');
    let produtos=localStorage.getItem('carrinho');
    if(produtos){
      this.listaProdutosCarrinho = JSON.parse(produtos);
    }else{
      this.router.navigate(['/carrinho'])
    }
    if (venda) {
      this.venda = JSON.parse(venda);
    } else {
      this.router.navigate(['/carrinho/pagamento'])
    }
    this.buscarProdutos();
  }
  backPage() {
    this.router.navigate(['/carrinho/pagamento']);
  }

  buscarProdutos() {
    if (this.listaProdutosCarrinho && this.listaProdutosCarrinho.length > 0) {
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
        })
      });
    }
  }
  enviar(){
    this.venda.dataVenda=new Date();
    this.venda.cliente=this.cliente;
    this.venda.frete=JSON.parse(sessionStorage.getItem('frete')!);
    this.venda.enderecoCliente=this.enderecoEntrega;
    console.log(this.venda)
    this.vendaService.postVenda(this.venda).subscribe(resp=>{
      sessionStorage.removeItem('frete');
      sessionStorage.removeItem('venda');
      sessionStorage.removeItem('endereco-entrega');
      localStorage.removeItem('carrinho');
        this.dialog.open(ModalVendaCadastradaComponent, {
          width: '600px',
          data: {
            produto: resp
          }
        });
    }, err=>{
      console.log('FALHA AO CADASTRAR VENDA')
    })
  }
}
