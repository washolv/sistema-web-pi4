import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';
import { Venda } from '../../checkout/models/Venda';
import { ModalDetalhesPedidoComponent } from '../../configuracao/cliente/meus-pedidos/modal-detalhes-pedido/modal-detalhes-pedido.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { StatusPedidoComponent } from '../status-pedido/status-pedido.component';


@Component({
  selector: 'app-tabela-vendas',
  templateUrl: './tabela-vendas.component.html',
  styleUrls: ['./tabela-vendas.component.css']
})
export class TabelaVendasComponent implements OnInit {
  vendas: Venda[]=[];
  public isSmallScreen = false;
  searchFilter = new Subject<string>();
  public filtroPesquisa: string = "";
  totalRegistros: number=0;
  page: number=1;
  constructor(private toastr: ToastrService,private roleGuardService: RoleGuardService,private dialog: MatDialog,
    private router: Router, private clienteService: ClienteService,private breakpointObserver: BreakpointObserver, private vendaService: VendaService) {
 }


 ngOnInit() {
   const dialogRef = this.dialog.open(LoadingComponent, {
     panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
   });
   this.searchFilter.pipe(
     debounceTime(1000),
     distinctUntilChanged())
     .subscribe(search => {
       this.vendaService.getByIdNumPedido(this.roleGuardService.getUser().Id!, this.filtroPesquisa)
         .subscribe((response: Venda[]) => {
           this.vendas = response;
         });
     });
     //<number>this.roleGuardService.getUser().Id
   this.vendaService.getByIdCliente(7).subscribe(response=>{
     this.vendas=response;
     console.log(response)
     dialogRef.close();
   })
 }
  backPage(){
    this.router.navigate(['/configuracoes'])
  }
  openModal(venda: Venda) {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    let dialogRef;
    if (this.isSmallScreen) {
      dialogRef = this.dialog.open(ModalDetalhesPedidoComponent, {
        height: '500px', width: '400px',
        data: {
          venda: venda
        }
      });
    } else {
      dialogRef = this.dialog.open(ModalDetalhesPedidoComponent, {
        maxHeight:'900px', width: '900px',
        data: {
          venda: venda
        }
      });
    }
    return dialogRef;
  }
  openModalModificarStatus(venda: Venda) {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    let dialogRef;
    if (this.isSmallScreen) {
      dialogRef = this.dialog.open(StatusPedidoComponent, {
        height: '500px', width: '400px',
        data: {
          venda: venda
        }
      });
    } else {
      dialogRef = this.dialog.open(StatusPedidoComponent, {
        maxHeight:'900px', width: '900px',
        data: {
          venda: venda
        }
      });
    }
    dialogRef.afterClosed().subscribe(resp => {
      this.vendaService.putVenda(resp).subscribe(resp => {
        this.toastr.success("Status do Pedido "+venda.numeroPedido+" atualizado", "OK", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      })
    })
    return dialogRef;
  }
  detalhes(venda: Venda){
    const dialogRef = this.openModal(venda);
    dialogRef.afterClosed().subscribe(response => {
    }, err => {
      console.log(err);
    });
  }
  modificarStatus(venda: Venda){
    const dialogRef = this.openModalModificarStatus(venda);
    dialogRef.afterClosed().subscribe(response => {
    }, err => {
      console.log(err);
    });
  }

}
