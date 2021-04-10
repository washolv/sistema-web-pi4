import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';

@Component({
  selector: 'app-main-nav-cliente',
  templateUrl: './main-nav-cliente.component.html',
  styleUrls: ['./main-nav-cliente.component.css']
})
export class MainNavClienteComponent implements OnInit {

  public userRole;
  public user;
  public qtdCarrinho: number = 0;
  constructor(private cartService: CartService, private loginService: LoginService, private router: Router, private roleGuardService: RoleGuardService) {
    this.userRole = roleGuardService.getUserRole();
    this.user = roleGuardService.decodeJWT();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.qtdCarrinho = this.cartService.qtdCarrinho();
    }
  }
  ngOnInit() {
    this.qtdCarrinho = this.cartService.qtdCarrinho();
  }
  configuracoes() {
    this.router.navigate(['/configuracoes']);
  }
  dashboard() {
    this.router.navigate([``]);
  }
  public logout() {
    this.loginService.logout();

  }

}
