import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../produto/models/Produto';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ModalProdutoCarrinhoComponent } from '../modals/modal-produto-carrinho/modal-produto-carrinho.component';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
  produto: Produto = new Produto();
  id: number = 0;
  formProduto: FormGroup;
  imageProduto: any;
  imageToShow: SafeResourceUrl[] = [];
  public currentRate: number = 0;
  imagens: any;
  cont: number = 0;
  constructor(private cartService: CartService, private config: NgbRatingConfig, private sanitizer: DomSanitizer, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder,
    private produtoService: ProdutoService, private dialog: MatDialog) {
    this.formProduto = this.createForm(this.produto);
    this.config.max = 5;
  }

  ngOnInit() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    this.route.params.subscribe(parametros => {
      this.id = parametros['id'];
    });
    this.produtoService.getProdutoById(this.id).subscribe(response => {
      this.produto = response
      this.formProduto = this.createForm(this.produto);
      this.currentRate = <number>this.produto.qtdEstrelas;
    })

    this.produtoService.getImagensProduto(this.id).subscribe(response => {
      this.imagens = response;
      response.forEach(element =>
        this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`))),
        dialogRef.close()
      )
    })
    this.formProduto.disable();
  }

  public createForm(produto: Produto): FormGroup {
    const status = produto.status == 1;
    if (status) {
      return this.fb.group({
        id: new FormControl(produto.id),
        nome: new FormControl(produto.nome),
        descricao: new FormControl(produto.descricao),
        quantidadeEstoque: new FormControl(produto.quantidadeEstoque),
        preco: new FormControl(produto.preco),
        categoria: new FormControl(produto.categoria),
        status: new FormControl(produto.status),
        qtdEstrelas: new FormControl(produto.qtdEstrelas)
      });
    } else {
      return this.fb.group({
        id: new FormControl(produto.id, Validators.required),
        nome: new FormControl(produto.nome, Validators.required),
        descricao: new FormControl(produto.descricao, Validators.required),
        quantidadeEstoque: new FormControl(produto.quantidadeEstoque, Validators.required),
        preco: new FormControl(produto.preco, Validators.required),
        categoria: new FormControl(produto.categoria, Validators.required),
        status: new FormControl(produto.status, Validators.required),
        qtdEstrelas: new FormControl(produto.qtdEstrelas)
      });
    }
  }
  adicionarCarrinho() {
    this.dialog.open(ModalProdutoCarrinhoComponent, {
      width: '600px',
      data: {
        produto: this.produto
      }
    });
  }
  backProdutos() {
    this.router.navigate(['dashboard']);
  }
}
