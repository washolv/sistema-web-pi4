import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from './models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: User = new User;
  public outline = 'true';
  public rounded = 'true';
  public username: string = '';
  public password: string = '';
  public block = true;
  public loginForm: FormGroup;
  public floating = true;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.floating = true;
    this.loginForm = this.fb.group({
      password: new FormControl(this.password),
      username: new FormControl(this.username),
    });
  }

  ngOnInit() {

  }

  onSubmit() {
      console.log(this.loginForm.value)
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
        this.router.navigate(['']);
        console.log("LOGIN EFETUADO")
      }, HttpErrorResponse =>{
        console.log(HttpErrorResponse)
      });

  }

}
