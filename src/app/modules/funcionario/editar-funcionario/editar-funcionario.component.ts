import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Endereco, Funcionario } from '../models/Funcionario';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {
  formValid: boolean = true;
  formFuncionario: FormGroup;
  public cepValido = false;
  public funcionario: Funcionario = new Funcionario()
  public endereco: Endereco = new Endereco()
  public color: ThemePalette = 'primary';
  cargos = [{ id: 1, nome: 'Administrador' }, { id: 2, nome: 'Estoquista' }];
  constructor(private toastr: ToastrService, private funcionarioService: FuncionarioService, private fb: FormBuilder,
    private buscarCepService: ConsultaCepService, public router: Router, private http: HttpClient) {
    this.formFuncionario = this.createFormFuncionario(this.funcionario);
    funcionarioService.buscarFuncionarioPorId(1).subscribe(res => {
      console.log(res)
      this.funcionario = res;
      this.formFuncionario = this.createFormFuncionario(this.funcionario);
    })
  }

  ngOnInit() {
  }

  get f() { return this.formFuncionario.controls; }

  public createFormFuncionario(funcionario: Funcionario): FormGroup {
    return this.fb.group({
      nome: new FormControl(this.funcionario.nome, Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      cpf: new FormControl(this.funcionario.cpf,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('/^-?(0|[1-9]\d*)?$/')
        ])),
      cargo: new FormControl(this.funcionario.cargo, Validators.compose([
        Validators.required,
      ])),
      dataNascimento: new FormControl(this.funcionario.dataNascimento,
        Validators.compose([
          Validators.required,
        ])),
      status: new FormControl(this.funcionario.status),
      email: new FormControl(this.funcionario.email,
        Validators.compose([
          Validators.required,
          Validators.email,
        ])),
      cep: new FormControl(this.funcionario.endereco?.cep,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])),
      senha: new FormControl(this.funcionario.senha,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])),
      logradouro: new FormControl(this.funcionario.endereco?.logradouro, Validators.required),
      telefone: new FormControl(this.funcionario.telefone, Validators.required),
      uf: new FormControl(this.funcionario.endereco?.uf, Validators.required),
      localidade: new FormControl(this.funcionario.endereco?.cidade, Validators.required),
    });
  }
  public addFuncionario() {
    console.log(this.formFuncionario.value)
    if (this.formFuncionario.valid) {
      this.funcionarioService.editarFuncionario(this.formFuncionario.value).subscribe(res => {
        this.toastr.success("Funcionário editado com sucesso", "OK", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, err => {
        this.toastr.error(err, "Erro", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      })
    }
  }
  public backPage() {
    this.router.navigate(['/funcionarios'])
  }
  onSubmit() {
    if (!this.formFuncionario.valid) {
      this.formValid = false;
    }
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
