import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../produto/produto/models/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) {
  }

  public getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos/produtos`);
  }
  public postProduto(produto: Produto): Observable<Produto> {
    console.log(produto);
    return this.http.post<Produto>(`${this.apiUrl}/produtos`, produto);
  }

}
