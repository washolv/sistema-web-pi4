import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../modules/produto/models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl = environment.baseAPIUrl+'/produtos';
  urlImage=environment.baseAPIUrl+'/imagens';

  constructor(private http: HttpClient) {
  }

  public getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos`);
  }
  public postProduto(produto: Produto): Observable<Produto> {
    console.log(produto);
    return this.http.post<Produto>(`${this.apiUrl}`, produto);
  }
  public deleteProduto(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.apiUrl}/${id}`);
  }
  public editarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}`, produto);
  }
  public uploadImage(imagens: FormData): Observable<Object> {
    return this.http.post(`${this.urlImage}`, imagens);
  }

}
