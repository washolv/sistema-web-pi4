import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  freteSelecionado: any;

  constructor(private toastr: ToastrService, private breakpointObserver: BreakpointObserver, private roleGuardService: RoleGuardService,
    private clienteService: ClienteService, private sanitizer: DomSanitizer, private dialog: MatDialog, private router: Router,
    private vendaService: VendaService, private produtoService: ProdutoService, private cartService: CartService) {
    let frete=sessionStorage.getItem('frete');
    if(frete){
      this.freteSelecionado = JSON.parse(frete);
    }else{
      this.router.navigate(['/endereco-entrega'])
    }
  }

  ngOnInit() {
  }
  backPage(){
    this.router.navigate(['/endereco-entrega'])
  }

}
