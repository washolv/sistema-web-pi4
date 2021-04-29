import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente, EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { Endereco } from 'src/app/modules/funcionario/models/Funcionario';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { ModalEditarEnderecoClienteComponent } from '../modal-editar-endereco-cliente/modal-editar-endereco-cliente.component';

@Component({
  selector: 'app-modal-adicionar-endereco-cobranca',
  templateUrl: './modal-adicionar-endereco-cobranca.component.html',
  styleUrls: ['./modal-adicionar-endereco-cobranca.component.css']
})
export class ModalAdicionarEnderecoCobrancaComponent implements OnInit {
  public formValid = true;
  public enderecoForm: FormGroup;
  public cepValido = true;
  public endereco = new EnderecoCliente();
  public cliente: Cliente = new Cliente();
  public enderecos: EnderecoCliente[] = [];
  public id: number = 0;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private buscarCepService: ConsultaCepService,
    private clienteService: ClienteService, public dialogRef: MatDialogRef<ModalAdicionarEnderecoCobrancaComponent>, private roleGuardService: RoleGuardService) {
    this.enderecoForm = this.createForm();
  }


  ngOnInit() {
    const user = this.roleGuardService.decodeJWT();
    this.id = user.Id;
    this.clienteService.buscarEnderecos(this.id).subscribe(resp =>{
      this.enderecos=resp;
    })
  }
  changeAddress(endereco: EnderecoCliente){
    this.enderecoForm.controls['cep'].setValue(endereco.cep);
    this.enderecoForm.controls['logradouro'].setValue(endereco.logradouro);
    this.enderecoForm.controls['numero'].setValue(endereco.numero);
    this.enderecoForm.controls['cidade'].setValue(endereco.cidade);
    this.enderecoForm.controls['uf'].setValue(endereco.uf);
    this.enderecoForm.controls['complemento'].setValue(endereco.complemento);
    this.enderecoForm.controls['bairro'].setValue(endereco.bairro);
    this.cepValido = true;
  }
  get f() { return this.enderecoForm.controls; }

  createForm() {
    return this.fb.group({
      cep: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
      complemento: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required)
    })
  }
  public buscarCep() {
    if (!this.f.cep.errors) {
      this.buscarCepService.buscar(this.enderecoForm.value.cep).subscribe(res => {
        this.enderecoForm.controls['logradouro'].setValue(res.logradouro);
        this.enderecoForm.controls['uf'].setValue(res.uf);
        this.enderecoForm.controls['cidade'].setValue(res.localidade);
        this.enderecoForm.controls['bairro'].setValue(res.bairro);
        this.cepValido = true;
      })
    }
  }

  close(endereco: EnderecoCliente) {
    endereco.status = true;
    this.dialogRef.close(endereco);
  }
  closeX() {
    this.dialogRef.close();
  }
  addEndereco() {
    if (this.enderecoForm.valid) {
      this.close(this.enderecoForm.value);
    } else {
      this.formValid = false;
    }
  }

}
