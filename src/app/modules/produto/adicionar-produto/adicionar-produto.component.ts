import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../models/Produto';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})

export class AdicionarProdutoComponent implements OnInit {
  public produto: Produto = new Produto();
  public produtoRetorno = new Produto();
  public images = [];
  public imageData: any;
  public formProduto: FormGroup;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService, public router: Router) {
    this.produto.status=0;
    this.formProduto=this.createForm(this.produto);
  }

  ngOnInit() {
  }

  public addProduto(p: Produto) {
    if(this.formProduto.valid){
      this.router.navigateByUrl('/produtos/adicionar/imagens', {
        state: { produto: p}
        })
    }
  }

  toggleVisibility(e: any, produto: Produto) {
    if (e.target.checked) {
      produto.status = 1;
    } else {
      produto.status = 0;
    }
  }
  public createForm(produto: Produto): FormGroup {
    return this.fb.group({
      nome: new FormControl([''], Validators.compose([
        Validators.required,
        //Validators.minLength(3),
        //Validators.maxLength(280)
      ])),
      descricao: new FormControl([''],
        Validators.compose([
          Validators.required,
          //Validators.minLength(3),
          //Validators.maxLength(1000)
        ])),
      quantidadeEstoque: new FormControl(['']),
      preco: new FormControl(produto.preco, Validators.compose([
        Validators.required,
      ])),
      categoria: new FormControl([''],
        Validators.compose([
          Validators.required,
        ])),
      status: new FormControl(produto.status),
      qtdEstrelas: new FormControl(produto.qtdEstrelas)
    });
  }

  backProdutos(){
    this.router.navigate(['produtos']);
  }

}
