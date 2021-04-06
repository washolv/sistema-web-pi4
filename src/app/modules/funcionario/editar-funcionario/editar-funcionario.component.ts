import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Endereco, Funcionario } from '../models/Funcionario';
import { ModalAlterarSenhaComponent } from './modals/modal-alterar-senha/modal-alterar-senha.component';

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
  public id = 0;
  cargos = [{ id: 1, nome: 'Administrador' }, { id: 2, nome: 'Estoquista' }];
  constructor(private dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute, private funcionarioService: FuncionarioService, private fb: FormBuilder,
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
      cpf: new FormControl({ value: this.funcionario.cpf, disabled: true },
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
        ])),
      cargo: new FormControl(this.funcionario.cargo, Validators.compose([
        Validators.required,
      ])),
      dataNascimento: new FormControl({ value: this.funcionario.dataNascimento, disabled: true },
        Validators.compose([
          Validators.required,
        ])),
      status: new FormControl(this.funcionario.status),
      email: new FormControl({ value: this.funcionario.email, disabled: true },
        Validators.compose([
          Validators.required,
          Validators.email,
        ])),
      cep: new FormControl({ value: this.funcionario.endereco?.cep, disabled: true },
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])),
      senha: new FormControl(this.funcionario.senha,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])),
      logradouro: new FormControl({ value: this.funcionario.endereco?.logradouro, disabled: true }, Validators.required),
      telefone: new FormControl({ value: this.funcionario.telefone, disabled: true }, Validators.required),
      uf: new FormControl({ value: this.funcionario.endereco?.uf, disabled: true }, Validators.required),
      localidade: new FormControl({ value: this.funcionario.endereco?.cidade, disabled: true }, Validators.required),
    });
  }
  public salvarFuncionario() {
    if (this.formFuncionario.valid) {
      this.funcionario.nome = this.formFuncionario.value.nome;
      this.funcionario.status = this.formFuncionario.value.status;
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
    } else {
      this.formValid = false;
    }
  }
  public backPage() {
    this.router.navigate(['/funcionarios'])
  }

  alterarSenha() {
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur',
      data: {
        funcionario: this.funcionario
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.funcionario = response;
        this.funcionarioService.editarFuncionario(this.funcionario).subscribe(response => {
          this.toastr.success("Senha alterada com sucesso", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }, err => {
          this.toastr.error("Falha ao alterar senha", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        })
      }
    }, err => {
      console.log(err);
    });
  }
  public buscarCep() {
    if (!this.f.cep.errors) {
      this.buscarCepService.buscar(this.formFuncionario.value.cep).subscribe(res => {
        if (!res.erro) {
          this.formFuncionario.value.logradouro = res.logradouro;
          this.formFuncionario.value.uf = res.uf;
          this.formFuncionario.value.localidade = res.localidade;
          this.cepValido = true;
        } else {
          this.toastr.error("CEP não encontrado", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }

      })
    } else {
      this.toastr.error("CEP inválido ", "Erro", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }
}
