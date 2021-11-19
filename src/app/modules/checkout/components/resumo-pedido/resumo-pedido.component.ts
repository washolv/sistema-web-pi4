import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cliente, EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';
import { ModalVendaCadastradaComponent } from '../../modals/ModalVendaCadastrada/ModalVendaCadastrada.component';
import { Carrinho } from '../../models/carrinho';
import { DetalhesVenda, Venda } from '../../models/Venda';

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
  valorParcela: number = 0;
  constructor(private roleGuardService: RoleGuardService, private clienteService: ClienteService, private sanitizer: DomSanitizer, private dialog: MatDialog,
    private router: Router, private produtoService: ProdutoService, private vendaService: VendaService) {
    let endereco = sessionStorage.getItem('endereco-entrega');
    let frete = sessionStorage.getItem('frete');
    if (endereco && frete) {
      this.enderecoEntrega = JSON.parse(endereco);
      this.venda.frete = JSON.parse(frete);
    } else {
      this.router.navigate(['/carrinho/endereco-entrega'])
    }

  }

  ngOnInit() {
    window.scrollTo(0, 0)
    let id = <number>this.roleGuardService.getUser().Id;
    this.clienteService.buscarCliente(id).subscribe(response => {
      this.cliente = response;
    });
    let venda = sessionStorage.getItem('venda');
    let produtos = sessionStorage.getItem('carrinho');
    if (produtos) {
      this.listaProdutosCarrinho = JSON.parse(produtos);
    } else {
      this.router.navigate(['/carrinho'])
    }
    if (venda) {
      this.venda = JSON.parse(venda);
      this.valorParcela = this.venda.valorTotal! / this.venda.parcelasCartao!;
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
            produto.imageToShow = response;
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
  enviar() {
    this.venda.dataVenda = new Date();
    this.venda.cliente = this.cliente;
    this.venda.frete = JSON.parse(sessionStorage.getItem('frete')!);
    this.venda.enderecoCliente = this.enderecoEntrega;
    this.vendaService.postVenda(this.venda).subscribe(resp => {
      this.dialog.open(ModalVendaCadastradaComponent, {
        width: '600px',
        data: {
          produto: resp
        }
      });
    }, err => {
      console.log('FALHA AO CADASTRAR VENDA')
    })

  }
}
