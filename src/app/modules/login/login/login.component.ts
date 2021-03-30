import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { AuthenticatedUser } from './models/AuthenticatedUser';
import { TokenDecoded } from './models/TokenDecoded';
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
  public block = true;
  public loginForm: FormGroup;
  public formValid=true;
  public floating = true;
  public usuarioAutenticado: AuthenticatedUser = new AuthenticatedUser();

  constructor(private toastr: ToastrService, private fb: FormBuilder, private router: Router, private loginService: LoginService, private roleGuardService: RoleGuardService) {
    this.floating = true;
    this.loginForm = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
    });
  }
  get f() { return this.loginForm.controls; }

  ngOnInit() {

  }

  onSubmit() {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
        if(response){
          this.router.navigate(['']);
          this.usuarioAutenticado = response;
          window.localStorage.setItem('access_token', this.usuarioAutenticado.access_token!);
        }
      }, HttpErrorResponse => {
        this.toastr.error("Usuário ou senha inválida", "Erro", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      });
    }else{
      this.formValid=false;
    }
  }

}
