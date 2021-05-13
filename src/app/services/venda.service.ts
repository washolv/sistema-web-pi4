import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venda } from '../modules/checkout/models/Venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) { }

  postVenda(venda: Venda):Observable<Venda>{
    sessionStorage.removeItem('carrinho');
    sessionStorage.removeItem('frete');
    sessionStorage.removeItem('venda');
    sessionStorage.removeItem('endereco-entrega');
    return this.http.post<Venda>(`${this.apiUrl}/vendas`, venda);
  }
  getByIdCliente(id: number):Observable<Venda[]>{
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas/cliente/${id}`);
  }
  getByIdNumPedido(id: number, num: string):Observable<Venda[]>{
    const httpOptions = {
      headers: new HttpHeaders({ numeroPedido : num }),
    };
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas/numeroPedido/cliente/${id}`,httpOptions);
  }
}
