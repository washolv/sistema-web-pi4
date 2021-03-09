import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'app-modal-adicionar-produto',
  templateUrl: './modal-adicionar-produto.component.html',
  styleUrls: ['./modal-adicionar-produto.component.css']
})
export class ModalAdicionarProdutoComponent implements OnInit {
  public produto: Produto = new Produto();
  public produtoRetorno = new Produto();
  public images = [];
  public files = [];
  constructor(private produtoService: ProdutoService, public router: Router, public dialogRef: MatDialogRef<ModalAdicionarProdutoComponent>) {

  }

  SalveImage(id: number) {

    console.log(this.produtoRetorno);
    this.closeModal();
    let uploadImageData = new FormData();
    for (const file of this.files) {
      console.log(file);
      uploadImageData.append('file', file);
    }
    this.produtoService.postFotoProduto(uploadImageData, id).subscribe((response: any) => {
      if (response) {
        this.closeModal();
        //window.location.reload()
      }
    });
  }
  public addProduto() {
    this.produtoService.postProduto(this.produto).subscribe((response: any) => {
      if (response) {
        this.produtoRetorno=response;
        this.SalveImage(this.produtoRetorno.id!)
      }
    });
  }

  /*public addFotoProduto() {
    let uploadImageData = new FormData();
    for (const file of this.files) {
      uploadImageData.append('arquivos', file);
    }
    this.produtoService.postFotoProduto(uploadImageData, this.produtoRetorno.id!).subscribe((response: any) => {
      if (response) {
        this.closeModal();
        window.location.reload()
      }
    });
  }*/
  public closeModal() {
    this.dialogRef.close();
  }
  processFile(event: any) {
    this.files = event.target.files;
  }
  ngOnInit() {
  }

}
