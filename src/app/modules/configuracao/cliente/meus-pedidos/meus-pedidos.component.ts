import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Venda } from 'src/app/modules/checkout/models/Venda';
import { LoadingComponent } from 'src/app/modules/shared/loading/loading.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';
import { ModalDetalhesPedidoComponent } from './modal-detalhes-pedido/modal-detalhes-pedido.component';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {
  vendas: Venda[]=[];
  public isSmallScreen = false;
  searchFilter = new Subject<string>();
  public filtroPesquisa: string = "";
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
    this.vendaService.getByIdCliente(<number>this.roleGuardService.getUser().Id).subscribe(response=>{
      this.vendas=response;
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
  detalhes(venda: Venda){
    const dialogRef = this.openModal(venda);
    dialogRef.afterClosed().subscribe(response => {
    }, err => {
      console.log(err);
    });
  }
}
