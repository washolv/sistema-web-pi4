import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(private roleGuardService: RoleGuardService, private config: NgbRatingConfig, private toastr: ToastrService, private modalService: AlertService, toastrService: ToastrService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private produtoService: ProdutoService) {
    this.config.max = 5;
    this.userRole=this.roleGuardService.getUserRole();
    this.formProduto = this.testeForm(this.produto);
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
    })
    this.categoria = [
      { id: 1, name: 'Cama' },
      { id: 2, name: 'Mesa' },
      { id: 3, name: 'Banho' },
      { id: 4, name: 'Decoração'}
    ];

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
      window.location.reload();
    }
    );
  }
  editarImagens() {
    if (this.formProduto.valid) {
      console.log(this.formProduto.valid)
      this.router.navigate([`/produtos/editar/imagens`, this.formProduto.value.id]);
    }
  }

  dataURItoBlob(dataURI: any) {
    var blob = new Blob([dataURI], { type: 'image/png' });
    var file = new File([blob], dataURI.fileName);

  }
  public testeForm(produto: Produto): FormGroup{
      if(this.userRole=="ROLE_ADMIN"){
        return this.createForm(produto, false);
      }else{
        return this.createForm(produto, true);
      }
  }
  public createForm(produto: Produto, isAdmin: boolean=false): FormGroup {
    return this.fb.group({
      id: new FormControl(produto.id),
      nome: new FormControl({value: produto.nome, disabled: isAdmin}, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(280)
      ])),
      descricao: new FormControl({value: produto.descricao, disabled: isAdmin},
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1000)
        ])),
      quantidadeEstoque: new FormControl({value: produto.quantidadeEstoque, disabled: false}),
      preco: new FormControl({value: produto.preco, disabled: isAdmin}, Validators.compose([
        Validators.required,
      ])),
      categoria: new FormControl({value: produto.categoria, disabled: isAdmin},
        Validators.compose([
          Validators.required,
        ])),
      status: new FormControl({value: produto.status, disabled: isAdmin}),
    });
  }

  public editarProduto(p: Produto) {
    p.qtdEstrelas = this.currentRate;
    console.log(this.formProduto.value)
    if (this.formProduto.valid) {
      if (this.formProduto.value.status) {
        this.formProduto.value.status = 1;
      } else {
        this.formProduto.value.status = 0;
      }
      this.produtoService.editarProduto(p).subscribe((response: any) => {
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
