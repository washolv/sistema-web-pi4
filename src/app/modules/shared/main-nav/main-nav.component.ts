import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { TokenDecoded } from '../../login/login/models/TokenDecoded';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit {
  public userRole;

  constructor(private router: Router, private roleGuardService: RoleGuardService) {
    const user = <TokenDecoded>this.roleGuardService.decodeJWT();
    if(user){
      this.userRole = user.authorities![0];
    }else{
      this.userRole = '';
    }
  }

  ngOnInit() {
  }
  dashboard() {
    this.router.navigate([``]);
  }

}
