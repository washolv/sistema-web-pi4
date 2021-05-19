import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'app-adicionar-estoque',
  templateUrl: './adicionar-estoque.component.html',
  styleUrls: ['./adicionar-estoque.component.css']
})
export class AdicionarEstoqueComponent implements OnInit {

  public produto: Produto = new Produto();
  public qtdEstoque: FormGroup;
  public formValid = true;
  public estoqueNegativo = false;
  constructor(public dialogRef: MatDialogRef<AdicionarEstoqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.produto) {
      this.produto = data.produto;
    }

    this.qtdEstoque = new FormGroup({
      estoque: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })

  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  closeX() {
    this.dialogRef.close(this.produto);
  }

  confirmar() {
    if (this.qtdEstoque.valid) {
      let novoValor = this.produto.quantidadeEstoque + this.qtdEstoque.value.estoque;
      if (novoValor < 0) {
        this.estoqueNegativo = true;
        this.formValid = false;
        return;
      }
      this.produto.quantidadeEstoque = novoValor;
      this.closeX();
    } else {
      this.formValid = false;
    }
  }
}
