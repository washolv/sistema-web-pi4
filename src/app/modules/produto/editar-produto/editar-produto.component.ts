import { PathLocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { ProdutoService } from 'src/app/services/produto.service';
import { GenericValidators } from '../../shared/validators/generic-validators';
import { Produto } from '../models/Produto';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  public produto: Produto = new Produto();
  public formProduto: FormGroup;
  public id: number = 0;
  mageProduto: any;
  imageToShow: SafeResourceUrl[] = [];
  images: any;
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
      response.forEach(element =>
        this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element}`)))
      )
    })


  }

  ngOnInit() {

  }


  teste(img: any) {
    this.dataURItoBlob(img);
    console.log('sadadsa')

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
        Validators.minLength(1),
        Validators.maxLength(10)
      ])),
      categoria: new FormControl(produto.categoria,
        Validators.compose([
          Validators.required,
        ])),
      status: new FormControl(produto.status),
    });
  }

  public editarProduto(p: Produto) {
    if(this.formProduto.valid){
      this.produtoService.editarProduto(p).subscribe((response: any) => {
        if (response) {
          console.log('******')
          console.log(response)
          //window.location.reload()
        }
      });
    }else{
      GenericValidators.verifierValidatorsForm(this.formProduto);
    }
  }

  toggleVisibility(e: any, produto: Produto) {
    if (e.target.checked) {
      produto.status = 1;
    } else {
      produto.status = 0;
    }
  }
  backProdutos() {
    this.router.navigate(['produtos']);
  }
}
