import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../models/Produto';
import {ThemePalette} from '@angular/material/core';

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
  public isChecked: boolean = false;
  public color: ThemePalette = 'primary';

  constructor(private fb: FormBuilder, public router: Router) {
    this.formProduto = this.createForm(this.produto);
  }

  ngOnInit() {
  }

  public addProduto() {
    if (this.formProduto.value) {
      this.formProduto.value.status = 1;
    } else {
      this.formProduto.value.status = 0;
    }
    this.router.navigateByUrl('/produtos/adicionar/imagens', {
      state: { produto: this.formProduto.value }
    })

  }

  public createForm(produto: Produto): FormGroup {
    return this.fb.group({
      qtdEstrelas: new FormControl(produto.qtdEstrelas),
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
      status: new FormControl(this.isChecked),
    });
  }

  backProdutos() {
    this.router.navigate(['produtos']);
  }

}
