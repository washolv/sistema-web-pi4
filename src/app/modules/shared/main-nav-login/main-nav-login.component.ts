import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';

@Component({
  selector: 'app-main-nav-login',
  templateUrl: './main-nav-login.component.html',
  styleUrls: ['./main-nav-login.component.css']
})
export class MainNavLoginComponent implements OnInit {
  userRole: string;

  constructor(private loginService: LoginService,private router: Router, private roleGuardService: RoleGuardService) {
    this.userRole=roleGuardService.getUserRole();
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
