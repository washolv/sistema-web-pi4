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
  public images = [];
  constructor(private produtoService: ProdutoService, public router: Router, public dialogRef: MatDialogRef<ModalAdicionarProdutoComponent>) {

  }

  public addProduto() {
    this.produtoService.postProduto(this.produto).subscribe((response: any) => {
      if (response) {
        this.closeModal();
        window.location.reload()
      }
    });
  }
  public closeModal() {
    this.dialogRef.close();
  }
  processFile(event: any) {

    let uploadImageData = new FormData();

    for (const file of event.target.files) {
      uploadImageData.append('arquivos', file);
    }
    this.produtoService.uploadImage(uploadImageData).subscribe(response => console.log(response));
  }
  ngOnInit() {
  }

}
