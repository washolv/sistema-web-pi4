import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from './models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: User=new User;
  public outline='true' ;
  public rounded='true';
  public block=true;
  public floating=true;
  constructor(private router: Router, private loginService: LoginService) {
    this.floating=true;
  }

  ngOnInit() {
  }

  async onSubmit(){
    try{
      const result=this.loginService.login(this.usuario);
      console.log(`Login efetuado: ${result}`);
      this.router.navigate(['']);
    }catch(err){
      console.log(err);
    }
  }

}
