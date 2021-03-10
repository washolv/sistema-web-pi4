import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../modules/produto/models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl = environment.baseAPIUrl;
  urlImage = environment.baseAPIUrl + '/imagens';

  constructor(private http: HttpClient) {
  }

  public getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos/produtos`);
  }
  public getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/produtos/${id}`);
  }
  public getProdutoByDescricao(search: string): Observable<Produto[]> {
    console.log(search);
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos/produtos/${search}`);
  }
  public getImagensProduto(id: number): Observable<File> {
    return this.http.get<File>(`${this.apiUrl}/imagens/produto/${id}`);
  }
  public postProduto(produto: Produto): Observable<Produto[]> {
    const t = this.http.post<Produto[]>(`${this.apiUrl}/produtos`, produto);
    return t;
  }
  public postFotoProduto(imagens: FormData, id: number): Observable<FormData> {
    return this.http.post<FormData>(`${this.urlImage}/produto/${id}`, imagens);
  }
  public deleteProduto(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.apiUrl}/produtos/${id}`);
  }
  public editarProduto(produto: Produto): Observable<Produto> {
    console.log(produto);
    const t=this.http.put<Produto>(`${this.apiUrl}/produtos`, produto);
    return t;
  }
  public uploadImage(imagens: FormData): Observable<Object> {
    return this.http.post(`${this.urlImage}`, imagens);
  }


}
