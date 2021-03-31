import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { TokenDecoded } from '../../login/login/models/TokenDecoded';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userRole;

  constructor(private router: Router, private roleGuardService: RoleGuardService) {
    const user = <TokenDecoded>this.roleGuardService.decodeJWT();
    console.log(user)
    if(user){
      this.userRole = user.authorities![0];
    }else{
      this.userRole = '';
    }
  }

  ngOnInit() {
  }

}
