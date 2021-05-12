import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from 'src/app/modules/checkout/models/Venda';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {
  vendas: Venda[]=[];
  constructor(private router: Router, private vendaService: VendaService, private roleGuardService: RoleGuardService) { }

  ngOnInit() {
    this.vendaService.getByIdCliente(<number>this.roleGuardService.getUser().Id).subscribe(response=>{
      this.vendas=response;
    })
  }
  backPage(){
    this.router.navigate(['/configuracoes'])
  }

}
