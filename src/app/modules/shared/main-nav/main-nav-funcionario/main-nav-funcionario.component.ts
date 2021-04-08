import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';

@Component({
  selector: 'app-main-nav-funcionario',
  templateUrl: './main-nav-funcionario.component.html',
  styleUrls: ['./main-nav-funcionario.component.css']
})
export class MainNavFuncionarioComponent implements OnInit {

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
