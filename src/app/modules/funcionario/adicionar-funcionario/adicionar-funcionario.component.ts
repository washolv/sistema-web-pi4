import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { FormValidations } from '../../shared/validators/formValidators';
import { Endereco, Funcionario, Usuario } from '../models/Funcionario';

@Component({
  selector: 'app-adicionar-funcionario',
  templateUrl: './adicionar-funcionario.component.html',
  styleUrls: ['./adicionar-funcionario.component.css']
})
export class AdicionarFuncionarioComponent implements OnInit {
  formValid: boolean = true;
  formFuncionario: FormGroup;
  public cepValido = false;
  public funcionario: Funcionario = new Funcionario()
  public endereco: Endereco = new Endereco()
  public color: ThemePalette = 'primary';
  public localidade: string = '';
  public uf: string = '';
  public logradouro: string = '';
  public usuario: Usuario;
  cargos = [{ id: 1, nome: 'Administrador' }, { id: 2, nome: 'Estoquista' }];
  constructor(private toastr: ToastrService, private funcionarioService: FuncionarioService, private fb: FormBuilder, private buscarCepService: ConsultaCepService, public router: Router, private http: HttpClient) {
    this.formFuncionario = this.createFormFuncionario();
    this.usuario=new Usuario
  }
  public myDatePickerOptions: IMyOptions = {
    // Your options
  };
  ngOnInit() {
  }

  limparCampos() {
    this.funcionario = new Funcionario;
    this.endereco = new Endereco;
    this.usuario=new Usuario
    this.formFuncionario = this.createFormFuncionario();
    this.formValid = true;
  }
  get f() { return this.formFuncionario.controls; }

  public createFormFuncionario(): FormGroup {
    return this.fb.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      cpf: new FormControl('',
        Validators.compose([
          Validators.required,
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
      senha: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])),
      logradouro: new FormControl(this.logradouro, Validators.required),
      telefone: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
      localidade: new FormControl('', Validators.required),
    });
  }

  public addFuncionario() {
    if (this.formFuncionario.valid) {
      this.funcionarioService.emailNaoCadastrado(this.formFuncionario.value.email).subscribe(response => {
        if (!response) {
          this.funcionarioService.cpfNaoCadastrado(this.formFuncionario.value.cpf).subscribe(r => {
            if (!r) {
              this.endereco.cep = this.formFuncionario.value.cep;
              this.endereco.cidade = this.formFuncionario.value.localidade;
              this.endereco.logradouro = this.formFuncionario.value.logradouro;
              this.endereco.uf = this.formFuncionario.value.uf;
              this.funcionario.telefone = this.formFuncionario.value.telefone;
              this.funcionario.cpf = this.formFuncionario.value.cpf;
              this.funcionario.dataNascimento = this.formFuncionario.value.dataNascimento;
              this.funcionario.nome = this.formFuncionario.value.nome;
              this.funcionario.telefone = this.formFuncionario.value.telefone;
              this.usuario.username = this.formFuncionario.value.email;
              this.usuario.active = true;
              this.usuario.password = this.formFuncionario.value.senha;
              this.funcionario.endereco = this.endereco;
              this.funcionario.usuario=this.usuario;
              this.funcionario.cargo = this.formFuncionario.value.cargo;

              this.funcionarioService.postFuncionario(this.funcionario).subscribe(res => {
                this.toastr.success("Funcionário adicionado com sucesso", "OK", {
                  timeOut: 3000, positionClass: 'toast-top-center',
                });
                this.limparCampos();
              }, err => {
                this.toastr.error(err, "Erro", {
                  timeOut: 3000, positionClass: 'toast-top-center',
                });
              })
            }else{
              this.toastr.error("CPF já cadastrado", "Erro", {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
            }
          })
        } else {
          this.toastr.error("e-mail já cadastrado", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      })
    } else {
      this.formValid = false;
    }
  }
  public backPage() {
    this.router.navigate(['/funcionarios'])
  }

  public buscarCep() {
    if (this.formFuncionario.value.cep) {
      this.buscarCepService.buscar(this.formFuncionario.value.cep).subscribe(res => {
        this.formFuncionario.controls['logradouro'].setValue(res.logradouro);
        this.formFuncionario.controls['uf'].setValue(res.uf);
        this.formFuncionario.controls['localidade'].setValue(res.localidade);
        this.cepValido = true;
      })
    }
  }

}
