import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { TokenDecoded } from '../../login/login/models/TokenDecoded';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit {
  public userRole;

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
