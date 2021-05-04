import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { Cliente, EnderecoCliente } from '../../cliente/models/Cliente';
import { ModalAdicionarEnderecoClienteComponent } from '../../configuracao/cliente/endereco-cliente/modals/modal-adicionar-endereco-cliente/modal-adicionar-endereco-cliente.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { DetalhesVenda, Venda } from '../models/Venda';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { VendaService } from 'src/app/services/venda.service';
import { Frete } from '../models/Frete';
import { Carrinho } from '../models/carrinho';
import { ProdutoService } from 'src/app/services/produto.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-endereco-entrega',
  templateUrl: './endereco-entrega.component.html',
  styleUrls: ['./endereco-entrega.component.css']
})
export class EnderecoEntregaComponent implements OnInit {
  public id: number=0;
  public enderecos: EnderecoCliente[]=[];
  public endereco: EnderecoCliente=new EnderecoCliente;
  public cliente:Cliente=new Cliente();
  public isSmallScreen:boolean=false;
  public venda: Venda=new Venda();
  public nav: any;
  public qtdProdutos: number = 1;
  public subTotal: number = 0;
  public valorTotal: number = 0;
  public frete: string='';
  public cepValido=false;
  public listaProdutosCarrinho: Carrinho[] = [];
  public freteSelecionado: Frete=new Frete('', 0);

  constructor(private toastr: ToastrService, private breakpointObserver: BreakpointObserver, private roleGuardService: RoleGuardService,
    private clienteService: ClienteService, private sanitizer: DomSanitizer,private dialog: MatDialog, private router: Router,
    private vendaService: VendaService,private produtoService: ProdutoService) {
      this.nav = this.router.getCurrentNavigation();
      if(!this.nav){
          router.navigate(['/carrinho']);
      }
    }

  ngOnInit() {
    this.venda = this.nav.extras.state.venda;
    const user=this.roleGuardService.decodeJWT();
    this.id=user.Id;
    this.clienteService.buscarCliente(this.id).subscribe(resp =>{
      this.cliente=resp;
    })
    this.clienteService.buscarEnderecos(this.id).subscribe(resp =>{
      this.enderecos=resp;
      this.endereco=resp[0];
    })
  }
  enderecoEntrega(index: number){
    this.endereco=this.enderecos[index];
  }

  openModal(){
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    let dialogRef;
    if(this.isSmallScreen){
       dialogRef = this.dialog.open(ModalAdicionarEnderecoClienteComponent, {
        height: '500px',width: '400px'
      });
    }else{
      dialogRef= this.dialog.open(ModalAdicionarEnderecoClienteComponent, {
      });
    }
    return dialogRef;
  }
  adicionarEndereco(){
    const dialogRef=this.openModal();
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let endereco = response;
        this.clienteService.adicionarEndereco(this.id,endereco).subscribe(response => {
          this.toastr.success("Novo Endereço Cadastrado", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.ngOnInit();
        }, err => {
          this.toastr.error("Falha cadastrar endereço", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        })
      }
    }, err => {
      console.log(err);
    });
  }
  adicionarEnderecoCobranca() {
    const dialogRef = this.openModal();
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.cliente.enderecoCobranca = response;
        this.clienteService.editarCliente(this.cliente).subscribe(response => {
          this.toastr.success("Novo Endereço Cadastrado", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.ngOnInit();
        }, err => {
          this.toastr.error("Falha cadastrar endereço", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        })
      }
    }, err => {
      console.log(err);
    });
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
  calculaTotal() {
    this.venda.valorTotal = 0;
    this.venda.detalhesVenda!.forEach(sub => {
      this.venda.valorTotal = sub.subTotal! + this.venda.valorTotal! + this.freteSelecionado.valorFrete;
    })
  }
  finalizarCompra(){
    this.venda.cliente=this.cliente;
    this.venda.enderecoCliente=this.endereco;
    this.venda.dataVenda=moment().toDate();
    localStorage.removeItem('carrinho');
    this.vendaService.postVenda(this.venda).subscribe(resp=>{
        this.toastr.success('Ok','Venda Cadastrada');
    })
  }

}
