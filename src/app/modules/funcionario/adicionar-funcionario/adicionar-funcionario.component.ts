import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { FormValidations } from '../../shared/validators/formValidators';
import { Endereco, Funcionario } from '../models/Funcionario';

@Component({
  selector: 'app-adicionar-funcionario',
  templateUrl: './adicionar-funcionario.component.html',
  styleUrls: ['./adicionar-funcionario.component.css']
})
export class AdicionarFuncionarioComponent implements OnInit {
  isChecked: boolean = false;
  formValid: boolean = true;
  formFuncionario: FormGroup;
  public cepValido = false;
  public funcionario: Funcionario=new Funcionario()
  public endereco: Endereco=new Endereco()
  public color: ThemePalette = 'primary';
  cargos = [{ id: 1, nome: 'Administrador' }, { id: 2, nome: 'Estoquista' }];
  constructor(private fb: FormBuilder, private buscarCepService: ConsultaCepService, public router: Router, private http: HttpClient) {
    this.formFuncionario = this.createFormFuncionario();
  }
  public myDatePickerOptions: IMyOptions = {
    // Your options
  };
  ngOnInit() {
  }
  get f() { return this.formFuncionario.controls; }

  public createFormFuncionario(): FormGroup {
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
          Validators.maxLength(1000),
          Validators.pattern('/^-?(0|[1-9]\d*)?$/')
        ])),
      cargo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dataNascimento: new FormControl('',
        Validators.compose([
          Validators.required,
        ])),
      status: new FormControl(true),
      email: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])),
      cep: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])),
      logradouro: new FormControl({ value: '', disabled: true }, Validators.required),
      telefone: new FormControl('', Validators.required),
      uf: new FormControl({ value: '', disabled: true }, Validators.required),
      localidade: new FormControl({ value: '', disabled: true }, Validators.required),
    });
  }
  public addFuncionario() {
  }
  public backPage() {

  }
  onSubmit() {
      this.endereco.cep=this.formFuncionario.value.cep;
      this.endereco.cidade=this.formFuncionario.value.localidade;
      this.endereco.logradouro=this.formFuncionario.value.logradouro;
      this.endereco.uf=this.formFuncionario.value.uf;
      this.funcionario.cargo=this.formFuncionario.value.cargo;
      this.funcionario.telefone=this.formFuncionario.value.telefone;
      this.funcionario.cpf=this.formFuncionario.value.cpf;
      this.funcionario.dataNascimento=this.formFuncionario.value.dataNascimento;
      this.funcionario.nome=this.formFuncionario.value.nome;
      this.funcionario.telefone=this.formFuncionario.value.telefone;
      this.funcionario.status=this.formFuncionario.value.status;
      this.funcionario.endereco=this.endereco;
      console.log(this.funcionario);
  }



  public buscarCep() {
    if (this.formFuncionario.value.cep) {
      this.buscarCepService.buscar(this.formFuncionario.value.cep).subscribe(res => {
        this.formFuncionario.value.logradouro = res.logradouro;
        this.formFuncionario.value.uf = res.uf;
        this.formFuncionario.value.localidade = res.localidade;
        this.cepValido = true;
      })
    }
  }

}
