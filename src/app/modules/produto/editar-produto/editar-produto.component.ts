import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Imagem, Produto } from '../models/Produto';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from '../../shared/modal-alerta/alert.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { isForOfStatement } from 'typescript';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../../shared/loading/loading.component';

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
  public currentRate: number = 0;
  public categoria: any;
  mageProduto: any;
  imageToShow: SafeResourceUrl[] = [];
  imagens: Imagem[] = [];
  bsModalRef: BsModalRef = new BsModalRef;
  public userRole;
  constructor(private dialog: MatDialog, private roleGuardService: RoleGuardService, private config: NgbRatingConfig, private toastr: ToastrService,
    private modalService: AlertService, toastrService: ToastrService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private produtoService: ProdutoService) {
      this.formProduto = this.testeForm(this.produto);
      this.userRole = this.roleGuardService.getUserRole();
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
      this.currentRate = <number>this.produto.qtdEstrelas;
      this.formProduto = this.testeForm(this.produto);
    })
    this.produtoService.getImagensProduto(this.id).subscribe(response => {
      this.imagens = response;
      response.forEach(element =>
        this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
      )
      dialogRef.close();
    })
    this.categoria = [
      { id: 1, name: 'Cama' },
      { id: 2, name: 'Mesa' },
      { id: 3, name: 'Banho' },
      { id: 4, name: 'Decoração' }
    ];
  }


  deleteImage(): void {
    let img;
    if (this.idImagem) {
      img = this.imagens[this.idImagem.relatedTarget];
    } else {
      img = this.imagens[0];
    }

    this.produtoService.deleteImagensProduto(img.id!).subscribe(response => {
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

  }
  public testeForm(produto: Produto): FormGroup {
    if (this.userRole == "ROLE_ADMIN") {
      return this.createForm(produto, false);
    } else {
      return this.createForm(produto, true);
    }
  }
  public createForm(produto: Produto, isAdmin: boolean = false): FormGroup {
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
      qtdEstrelas: new FormControl('')
    });
  }

  public editarProduto() {
    this.formProduto.value.qtdEstrelas = this.currentRate;
    let produto: Produto = new Produto();
    if (this.userRole == 'ROLE_ADMIN') {
      produto = this.formProduto.value;
    } else if (this.userRole == 'ROLE_ESTOQUISTA') {
      produto = this.produto
      produto.quantidadeEstoque = this.formProduto.value.quantidadeEstoque
    }
    if (this.formProduto.valid) {
      if (this.formProduto.value.status) {
        this.formProduto.value.status = 1;
      } else {
        this.formProduto.value.status = 0;
      }
      console.log(this.formProduto.value)
      this.produtoService.editarProduto(produto).subscribe((response: any) => {
        if (response) {
          this.toastr.success("Produto alterado com sucesso", "Ok", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      },
        err => {
          this.toastr.error("Error ao alterar produto", "Falha", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        });
    }
  }

  backProdutos() {
    this.router.navigate(['produtos']);
  }
}
