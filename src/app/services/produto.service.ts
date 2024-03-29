import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagem, Produto } from '../modules/produto/models/Produto';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl = environment.baseAPIUrl;
  urlImage = environment.baseAPIUrl + '/imagens';

  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {
  }

  public getProdutos(): Observable<HttpResponse<Produto[]>> {
    const httpOptions = {
      headers: new HttpHeaders({ habilitado: 'false' }),
    };
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos`, { observe: 'response', ...httpOptions });
  }
  public getProdutosHabilitados(): Observable<Produto[]> {
    const httpOptions = {
      headers: new HttpHeaders({ habilitado: 'true' }),
    };
    return new Observable((obs)=>{
      return this.http.get<Produto[]>(`${this.apiUrl}/produtos`, { observe: 'response', ...httpOptions }).subscribe((response)=>{
        let produtos=<Produto[]>response.body;
        produtos.map((produto)=>{
            this.getImagensProduto(produto.id!).subscribe((imagens)=>{
              produto.imageToShow=imagens;
            })
            obs.next(produtos);
            obs.complete();
          })
      })

    })
  }
  public getProdutosHabilitadosPorCategoria(categoria: string): Observable<Produto[]> {
    const httpOptions = {
      headers: new HttpHeaders({ habilitado: 'true', categoria: categoria }),
    };
    return new Observable((obs)=>{
      return this.http.get<Produto[]>(`${this.apiUrl}/produtos/categoria`, { observe: 'response', ...httpOptions }).subscribe((response)=>{
        let produtos=<Produto[]>response.body;
        produtos.map((produto)=>{
            this.getImagensProduto(produto.id!).subscribe((imagens)=>{
              produto.imageToShow=imagens;
              obs.next(produtos);
              obs.complete();
            })
          })
      })

    })
  }
  public getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/produtos/find/${id}`);
  }
  public getProdutoByDescricao(search: string, habilitado = true): Observable<Produto[]> {
    const httpOptions = {
      headers: new HttpHeaders({ habilitado: habilitado.toString() }),
    };
    return new Observable((obs)=>{
      return this.http.get<Produto[]>(`${this.apiUrl}/produtos/${search}`, httpOptions).subscribe((produtos)=>{
        produtos.map((produto)=>{
            this.getImagensProduto(produto.id!).subscribe((imagens)=>{
              produto.imageToShow=imagens;
            })
          })
      })
    })
  }
  public getImagensProduto(id: number): Observable<Imagem[]> {
    return new Observable((obs)=>{
      this.http.get<Imagem[]>(`${this.apiUrl}/imagens/produto/${id}`).subscribe((imagens)=>{
        const imgs=imagens.map((img)=>this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img.imagem}`));
        obs.next(imgs);
        obs.complete();
      })
    })
  }
  public deleteImagensProduto(id: number): Observable<Imagem[]> {
    return this.http.delete<Imagem[]>(`${this.apiUrl}/imagens/${id}`);
  }
  public postProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/produtos`, produto);
  }
  public postFotoProduto(imagens: FormData, id: number, imagemFavorita: number): Observable<FormData> {
    const httpOptions = {
      headers: new HttpHeaders({ favorita: imagemFavorita.toString() }),
    };
    return this.http.post<FormData>(`${this.urlImage}/produto/${id}`, imagens, httpOptions);
  }
  public postFotoFavorita(idImg: number, idProd: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ idImagem: idImg.toString(), idProduto: idProd.toString() })
    };
    return this.http.put<any>(`${this.apiUrl}/imagens/editarFavorita`, null, httpOptions);
  }
  public deleteProduto(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.apiUrl}/produtos/${id}`);
  }
  public editarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/produtos`, produto);
  }
  public uploadImage(imagens: FormData): Observable<Object> {
    return this.http.post(`${this.urlImage}`, imagens);
  }


}
