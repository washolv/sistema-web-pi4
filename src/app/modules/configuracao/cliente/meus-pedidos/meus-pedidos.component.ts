import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Venda } from 'src/app/modules/checkout/models/Venda';
import { LoadingComponent } from 'src/app/modules/shared/loading/loading.component';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {
  vendas: Venda[]=[];
  constructor(private router: Router, private vendaService: VendaService, private roleGuardService: RoleGuardService, private dialog: MatDialog) { }

  ngOnInit() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    this.vendaService.getByIdCliente(<number>this.roleGuardService.getUser().Id).subscribe(response=>{
      this.vendas=response;
      console.log(response)
      dialogRef.close();
    })
  }
  backPage(){
    this.router.navigate(['/configuracoes'])
  }

}
