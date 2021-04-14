import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario, Endereco, Usuario } from 'src/app/modules/funcionario/models/Funcionario';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  formValid: boolean = true;
  public formFuncionario!: FormGroup;
  public cepValido = false;
  public funcionario: Funcionario = new Funcionario()
  public endereco: Endereco = new Endereco()
  private usuario: Usuario=new Usuario;
  public id = 0;
  constructor(private fb: FormBuilder, private dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute, private clienteService: ClienteService) { }

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
      status: new FormControl(this.funcionario.usuario?.active),
      email: new FormControl({ value: this.funcionario.usuario?.username, disabled: true },
        Validators.compose([
          Validators.required,
          Validators.email,
        ])),
      cep: new FormControl({ value: this.funcionario.endereco?.cep, disabled: true },
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])),
      senha: new FormControl(this.funcionario.usuario?.password,
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
}
