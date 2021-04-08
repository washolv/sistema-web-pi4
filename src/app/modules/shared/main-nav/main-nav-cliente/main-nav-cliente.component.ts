import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private loginService: LoginService,private router: Router, private roleGuardService: RoleGuardService) {
    this.userRole=roleGuardService.getUserRole();
    this.user=roleGuardService.decodeJWT();
  }

  ngOnInit() {
  }
  dashboard() {
    this.router.navigate([``]);
  }
  public logout(){
    this.loginService.logout();

  }

}
