import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Funcionario } from '../models/Funcionario';

@Component({
  selector: 'app-adicionar-funcionario',
  templateUrl: './adicionar-funcionario.component.html',
  styleUrls: ['./adicionar-funcionario.component.css']
})
export class AdicionarFuncionarioComponent implements OnInit {
  isChecked: boolean=false;
  formValid: boolean=true;
  formFuncionario: FormGroup;
  public color: ThemePalette = 'primary';
  cargos=[{id:1, nome:'Administrador'}, {id:2, nome:'Estoquista'}];
  constructor(private fb: FormBuilder, public router: Router) {
    this.formFuncionario=this.createForm();
   }

  ngOnInit() {
  }
  get f() { return this.formFuncionario.controls; }

  public createForm(): FormGroup {
    return this.fb.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(280),
      ])),
      cpf: new FormControl('',
        Validators.compose([
          Validators.required,
            Validators.minLength(3),
          Validators.maxLength(1000)
        ])),
        cargo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dataNascimento: new FormControl('',
        Validators.compose([
          Validators.required,
        ])),
        status: new FormControl(this.isChecked),
    });
  }
  public addFuncionario(){

  }
  public backPage(){

  }

}
