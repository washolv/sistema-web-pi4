import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';

@Component({
  selector: 'app-dashboard-funcionario',
  templateUrl: './dashboard-funcionario.component.html',
  styleUrls: ['./dashboard-funcionario.component.css']
})
export class DashboardFuncionarioComponent implements OnInit {

  public userRole;
  public user;
  constructor(private loginService: LoginService,private router: Router, private roleGuardService: RoleGuardService) {
    this.userRole=roleGuardService.getUserRole();
    this.user=roleGuardService.decodeJWT();
  }

  ngOnInit() {
  }

}
