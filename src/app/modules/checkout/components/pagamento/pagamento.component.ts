import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';
import { Cliente } from '../../../cliente/models/Cliente';
import { ModalAdicionarEnderecoClienteComponent } from '../../../configuracao/cliente/endereco-cliente/modals/modal-adicionar-endereco-cliente/modal-adicionar-endereco-cliente.component';
import { ModalAdicionarEnderecoCobrancaComponent } from '../../../configuracao/cliente/endereco-cliente/modals/modal-adicionar-endereco-cobranca/modal-adicionar-endereco-cobranca.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { Carrinho } from '../../models/carrinho';
import { DetalhesVenda, Venda } from '../../models/Venda';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  freteSelecionado: any;
  cliente: Cliente = new Cliente();
  public venda: Venda = new Venda();
  id: number = 0;
  tabIndex: number = 0;
  listaProdutosCarrinho: Carrinho[] = [];
  parcelas: any[] = [];
  pagamentoSelecionado: any;
  descontoBoleto: number = 0;
  descontoCartao: number = 0;
  valorTotal: number = 0;
  valorComDesconto: number = 0;
  cardForm: FormGroup;
  formValid = true;
  selectedOption: any;
  isSmallScreen:boolean=false;
  constructor(private toastr: ToastrService, private breakpointObserver: BreakpointObserver, private roleGuardService: RoleGuardService,
    private clienteService: ClienteService, private sanitizer: DomSanitizer, private dialog: MatDialog, private router: Router,
    private vendaService: VendaService, private produtoService: ProdutoService, private fb: FormBuilder) {
    let frete = sessionStorage.getItem('frete');
    if (frete) {
      this.freteSelecionado = JSON.parse(frete);
    } else {
      this.router.navigate(['/endereco-entrega'])
    }
    this.cardForm = this.createForm();
  }
  get f() { return this.cardForm.controls; }

  ngOnInit() {
    window.scrollTo(0, 0)
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    let produtos = sessionStorage.getItem('carrinho');
    if (produtos) {
      this.listaProdutosCarrinho = JSON.parse(produtos);
    } else {
      this.router.navigate(['/carrinho'])
    }
    let f = sessionStorage.getItem('frete');
    if (f) {
      this.freteSelecionado = JSON.parse(f);
    }
    this.buscarProdutos();
    this.calculaTotal();
    const user = this.roleGuardService.decodeJWT();
    this.id = user.Id;
    this.clienteService.buscarCliente(this.id).subscribe(resp => {
      this.cliente = resp;
      dialogRef.close();
    })
  }
  openModal() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    let dialogRef;
    if (this.isSmallScreen) {
      dialogRef = this.dialog.open(ModalAdicionarEnderecoCobrancaComponent, {
        height: '500px', width: '400px'
      });
    } else {
      dialogRef = this.dialog.open(ModalAdicionarEnderecoCobrancaComponent, {
      });
    }
    return dialogRef;
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
  createForm(): FormGroup {
    return this.fb.group({
      nome: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      validade: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required)
    })
  }

  buscarProdutos() {
    this.venda=new Venda();
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
          this.venda.valorTotal = this.venda.valorTotal! + itemCarrinho.subTotal;
          this.venda.quantidadeTotal! += x.quantidade!;
          this.valorTotal = this.venda.valorTotal;
          this.venda.valorParcial=this.valorTotal;
          let parc = new Array();
          for (let i = 1; i <= 12; i++) {
            let valorParcela = this.valorTotal! / i;
            if (i == 1) {
              valorParcela = valorParcela - (valorParcela * 0.1);
            }
            parc.push({ valor: valorParcela, totalParcelas: i });
          }
          this.parcelas = parc;
          this.descontoBoleto = this.valorTotal! * 0.15;
          this.descontoCartao = this.valorTotal! * 0.1;
          this.venda.pagamento = "Cartão";
          this.venda.desconto = this.descontoCartao;
          this.venda.parcelasCartao = 1;
          this.calculaTotal();
        })
      });
    }

  }
  calculaTotal() {
    this.venda.valorTotal = 0;
    this.venda.detalhesVenda!.forEach(sub => {
      this.venda.valorTotal = sub.subTotal! + this.venda.valorTotal!;
    })
    this.venda.valorTotal = this.venda.valorTotal + this.freteSelecionado.valorFrete;
  }
  backPage() {
    this.router.navigate(['/carrinho/endereco-entrega']);
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    let valor = this.venda.valorParcial;
    this.tabIndex = tabChangeEvent.index;
    if (this.tabIndex == 0) {
      this.venda.pagamento = "Cartão";
      this.venda.desconto = this.descontoCartao;
      this.venda.valorTotal = this.venda.valorParcial! - this.venda.desconto!;
    } else {
      this.venda.pagamento = "Boleto";
      this.venda.desconto = this.descontoBoleto;
      this.venda.valorTotal = this.venda.valorParcial! - this.venda.desconto!;
      this.formValid = true;
    }
  }
  setParcelas(event: any) {
    this.venda.parcelasCartao = event.value;
    if(event.value==1){
      this.descontoCartao=this.venda.valorParcial!*0.1;
    }else{
      this.descontoCartao=0;
    }
    this.venda.desconto=this.descontoCartao;
    this.venda.valorTotal=this.venda.valorParcial!-this.venda.desconto;
  }

  finalizarCompra() {
    let detalhesNull = [] = [];
    if (this.tabIndex == 0) {
      if (this.cardForm.valid) {
        let frete = sessionStorage.getItem('frete');
        if (frete) {
          this.venda.frete = JSON.parse(frete);
        }
        this.venda.detalhesVenda = detalhesNull;
        sessionStorage.setItem('venda', JSON.stringify(this.venda));
        this.router.navigate(['/carrinho/resumo-do-pedido'])
      } else {
        this.formValid = false;
      }
    } else {
      let frete = sessionStorage.getItem('frete');
      if (frete) {
        this.venda.frete = JSON.parse(frete);
      }
      this.venda.detalhesVenda = detalhesNull;
      sessionStorage.setItem('venda', JSON.stringify(this.venda));
      this.router.navigate(['/carrinho/resumo-do-pedido'])
    }
  }
}
