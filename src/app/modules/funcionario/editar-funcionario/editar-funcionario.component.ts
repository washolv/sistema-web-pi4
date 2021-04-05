import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public id=0;
  cargos = [{ id: 1, nome: 'Administrador' }, { id: 2, nome: 'Estoquista' }];
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private funcionarioService: FuncionarioService, private fb: FormBuilder,
    private buscarCepService: ConsultaCepService, public router: Router, private http: HttpClient) {
      this.route.params.subscribe(parametros => {
        this.id = parametros['id'];
      });
    this.formFuncionario = this.createFormFuncionario(this.funcionario);
    funcionarioService.buscarFuncionarioPorId(this.id).subscribe(res => {
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
  public salvarFuncionario() {
    if (this.formFuncionario.valid) {
      this.endereco.id=this.funcionario.endereco!.id;
      this.endereco.cep = this.formFuncionario.value.cep;
      this.endereco.cidade = this.formFuncionario.value.localidade;
      this.endereco.logradouro = this.formFuncionario.value.logradouro;
      this.endereco.uf = this.formFuncionario.value.uf;
      this.funcionario.telefone = this.formFuncionario.value.telefone;
      this.funcionario.cpf = this.formFuncionario.value.cpf;
      this.funcionario.dataNascimento = this.formFuncionario.value.dataNascimento;
      this.funcionario.nome = this.formFuncionario.value.nome;
      this.funcionario.telefone = this.formFuncionario.value.telefone;
      this.funcionario.status = this.formFuncionario.value.status;
      this.funcionario.email = this.formFuncionario.value.email;
      this.funcionario.endereco = this.endereco;
      this.funcionario.cargo = this.formFuncionario.value.cargo;
      this.funcionarioService.editarFuncionario(this.funcionario).subscribe(res => {
        this.toastr.success("Funcionário editado com sucesso", "OK", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, err => {
        this.toastr.error(err, "Erro", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      })
    }else{
      this.formValid=false;
    }
  }
  public backPage() {
    this.router.navigate(['/funcionarios'])
  }


  public buscarCep() {
    if (!this.f.cep.errors) {
      this.buscarCepService.buscar(this.formFuncionario.value.cep).subscribe(res => {
        if(!res.erro){
            this.formFuncionario.value.logradouro = res.logradouro;
          this.formFuncionario.value.uf = res.uf;
          this.formFuncionario.value.localidade = res.localidade;
          this.cepValido = true;
        }else{
          this.toastr.error("CEP não encontrado", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }

      })
    }else{
      this.toastr.error("CEP inválido ", "Erro", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }
}
