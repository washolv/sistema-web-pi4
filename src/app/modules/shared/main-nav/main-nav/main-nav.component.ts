import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit {
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
