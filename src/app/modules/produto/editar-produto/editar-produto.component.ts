import { PathLocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { ProdutoService } from 'src/app/services/produto.service';
import { GenericValidators } from '../../shared/validators/generic-validators';
import { Imagem, Produto } from '../models/Produto';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  color: ThemePalette = 'primary';
  public produto: Produto = new Produto();
  public formProduto: FormGroup;
  public id: number = 0;
  public idImagem: any;
  mageProduto: any;
  imageToShow: SafeResourceUrl[] = [];
  imagens: Imagem[] = [];
  constructor(private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private produtoService: ProdutoService) {
    this.formProduto = this.createForm(this.produto);
    this.route.params.subscribe(parametros => {
      this.id = parametros['id'];
    });
    this.produtoService.getProdutoById(this.id).subscribe(response => {
      this.produto = response
      this.formProduto = this.createForm(this.produto);
    })
    this.produtoService.getImagensProduto(this.id).subscribe(response => {
      this.imagens = response;
      console.log(response);
      response.forEach(element =>
        this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
      )
    })


  }

  ngOnInit() {
  }


  deleteImage(): void {
    let img;
    if (this.idImagem) {
      img = this.imagens[this.idImagem.relatedTarget];
    } else {
      img = this.imagens[0];
    }

    this.produtoService.deleteImagensProduto(img.id!).subscribe(response => {
      console.log(response)
      window.location.reload();
    }
    );
  }
  editarImagens() {
    if (this.formProduto.valid) {
      this.router.navigate([`/produtos/editar/imagens`, this.formProduto.value.id]);
    }
  }

  dataURItoBlob(dataURI: any) {
    var blob = new Blob([dataURI], { type: 'image/png' });
    var file = new File([blob], dataURI.fileName);
    console.log(file);

  }
  public createForm(produto: Produto): FormGroup {
    return this.fb.group({
      id: new FormControl(produto.id),
      nome: new FormControl(produto.nome, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(280)
      ])),
      descricao: new FormControl(produto.descricao,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1000)
        ])),
      quantidadeEstoque: new FormControl(produto.quantidadeEstoque),
      preco: new FormControl(produto.preco, Validators.compose([
        Validators.required,
      ])),
      categoria: new FormControl(produto.categoria,
        Validators.compose([
          Validators.required,
        ])),
      status: new FormControl(produto.status),
    });
  }

  public editarProduto(p: Produto) {
    if (this.formProduto.valid) {
      if (this.formProduto.value.status) {
        this.formProduto.value.status = 1;
      } else {
        this.formProduto.value.status = 0;
      }
      this.produtoService.editarProduto(p).subscribe((response: any) => {
        if (response) {
          console.log('******')
          console.log(response)
        }
      });
    } else {
      GenericValidators.verifierValidatorsForm(this.formProduto);
    }
  }

  backProdutos() {
    this.router.navigate(['produtos']);
  }
}
