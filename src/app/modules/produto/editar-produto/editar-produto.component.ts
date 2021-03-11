import { PathLocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
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
  imageToShow: SafeResourceUrl[]=[];
  images:any;
  constructor(private sanitizer: DomSanitizer,private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
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
      response.forEach(element=>
        this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element}`)))
        )
    })
  }

  ngOnInit() {

  }
  public createForm(produto: Produto): FormGroup {
    const status=produto.status==1;
    console.log(status);
    if(status){
      return this.fb.group({
        id: new FormControl(produto.id),
        nome: new FormControl(produto.nome),
        descricao: new FormControl(produto.descricao),
        quantidadeEstoque: new FormControl(produto.quantidadeEstoque),
        preco: new FormControl(produto.preco),
        categoria: new FormControl(produto.categoria),
        status: new FormControl(produto.status),
      });
    }else{
      return this.fb.group({
        id: new FormControl(produto.id, Validators.required),
        nome: new FormControl(produto.nome, Validators.required),
        descricao: new FormControl(produto.descricao, Validators.required),
        quantidadeEstoque: new FormControl(produto.quantidadeEstoque, Validators.required),
        preco: new FormControl(produto.preco, Validators.required),
        categoria: new FormControl(produto.categoria,Validators.required),
        status: new FormControl(produto.status,Validators.required),
      });
    }
  }

  public editarProduto(p: Produto) {
    console.log(p);
    this.produtoService.editarProduto(p).subscribe((response: any) => {
      if (response) {
        console.log('******')
          console.log(response)
        //window.location.reload()
      }
    });
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
