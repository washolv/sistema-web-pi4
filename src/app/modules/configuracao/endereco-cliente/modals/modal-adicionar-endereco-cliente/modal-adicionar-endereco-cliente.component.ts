import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente, EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';

@Component({
  selector: 'app-modal-adicionar-endereco-cliente',
  templateUrl: './modal-adicionar-endereco-cliente.component.html',
  styleUrls: ['./modal-adicionar-endereco-cliente.component.css']
})
export class ModalAdicionarEnderecoClienteComponent implements OnInit {
  public formValid = true;
  public enderecoForm: FormGroup;
  public cepValido = true;
  public cliente: Cliente=new Cliente();
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,private buscarCepService: ConsultaCepService,
   private clienteService: ClienteService,public dialogRef: MatDialogRef<ModalAdicionarEnderecoClienteComponent>) {
    this.enderecoForm = this.createForm();
  }


  ngOnInit() {
  }

  get f() { return this.enderecoForm.controls; }

  createForm() {
    return this.fb.group({
      cep: new FormControl('', Validators.required),
      logradouro: new FormControl({value:'', disabled: true}, Validators.required),
      numero: new FormControl('', Validators.required),
      cidade: new FormControl({value:'', disabled: true}, Validators.required),
      uf: new FormControl({value:'', disabled: true}, Validators.required),
      complemento: new FormControl('', Validators.required),
      bairro: new FormControl({value:'', disabled: true}, Validators.required)
    })
  }
  public buscarCep() {
    if (!this.f.cep.errors) {
      this.buscarCepService.buscar(this.enderecoForm.value.cep).subscribe(res => {
        console.log(res)
        this.enderecoForm.controls['logradouro'].setValue(res.logradouro);
        this.enderecoForm.controls['uf'].setValue(res.uf);
        this.enderecoForm.controls['cidade'].setValue(res.localidade);
        this.enderecoForm.controls['bairro'].setValue(res.bairro);
        this.cepValido = true;
      })
    }
  }

  close(endereco: EnderecoCliente){
    this.dialogRef.close(endereco);
  }
  closeX(){
    this.dialogRef.close();
  }
  addEndereco(){
    if(this.enderecoForm.valid){
      this.close(this.enderecoForm.value);
    }else{
      this.formValid=false;
    }
  }

}
