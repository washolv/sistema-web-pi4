import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'app-modal-editar-produto',
  templateUrl: './modal-editar-produto.component.html',
  styleUrls: ['./modal-editar-produto.component.css']
})
export class ModalEditarProdutoComponent implements OnInit {
  public produto: Produto = new Produto();
  public formProduto: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private produtoService: ProdutoService, public router: Router,
    public dialogRef: MatDialogRef<ModalEditarProdutoComponent>) {
    this.produto = data.prod;
    console.log(this.produto);
    this.formProduto = this.createForm();
    console.log(this.formProduto.value);
  }

  ngOnInit() {
  }
  public createForm(): FormGroup {
    return this.fb.group({
      nome: new FormControl(this.produto.nome),
      descricao: new FormControl(this.produto.descricao),
      quantidadeEstoque: new FormControl(this.produto.quantidadeEstoque),
      preco: new FormControl(this.produto.preco),
      categoria: new FormControl(this.produto.categoria),
    });
  }

  public editarProduto(p: Produto) {
    this.produtoService.editarProduto(p).subscribe((response: any) => {
      if (response) {
        this.dialogRef.close();
        window.location.reload()
      }
    });
  }

}
