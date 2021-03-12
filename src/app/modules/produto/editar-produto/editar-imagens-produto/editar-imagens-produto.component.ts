import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'app-editar-imagens-produto',
  templateUrl: './editar-imagens-produto.component.html',
  styleUrls: ['./editar-imagens-produto.component.css']
})
export class EditarImagensProdutoComponent implements OnInit {
  public imageToShow: SafeResourceUrl[] = [];
  public imagens: any;
  public produto: Produto=new Produto;
  public files: any = new Array();
  id: number=0;
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private produtoService: ProdutoService, private router: Router) {
    this.route.params.subscribe(parametros => {
      this.id = parametros['id'];
    });
    this.produtoService.getProdutoById(this.id).subscribe(resp=>{
      this.produto=resp;
    })
    this.produtoService.getImagensProduto(this.id).subscribe(response => {
      this.imagens = response;
      response.forEach(element =>
        this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
      )
    })

  }

  ngOnInit() {
  }
  processFile(event: any) {
    this.files = event.target.files;

    for (let file of this.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let duplicada = false;

      reader.onload = event => {
        this.imagens.push(reader.result);
      }
    }
  }
  deleteImageBanco(url: any, i: number): void {
    let img = this.imagens[i];
    this.produtoService.deleteImagensProduto(img.id!).subscribe(response => {
      window.location.reload();
    }
    );
  }
}
