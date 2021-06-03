import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venda } from '../modules/checkout/models/Venda';
import { Status } from '../modules/venda/models/Status';

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
  putVenda(venda:Venda):Observable<Venda>{
    return this.http.put<Venda>(`${this.apiUrl}/vendas`, venda);
  }
  getByIdCliente(id: number):Observable<Venda[]>{
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas/cliente/${id}`);
  }
  getVendas():Observable<Venda[]>{
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas`);
  }
  getByIdNumPedido(id: number, num: string):Observable<Venda[]>{
    const httpOptions = {
      headers: new HttpHeaders({ numeroPedido : num }),
    };
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas/numeroPedido/cliente/${id}`,httpOptions);
  }
  getByNumPedido(num: string):Observable<Venda[]>{
    const httpOptions = {
      headers: new HttpHeaders({ numeroPedido : num }),
    };
    return this.http.get<Venda[]>(`${this.apiUrl}/vendas/numeroPedido`,httpOptions);
  }

  getStatusVenda(): Status[]{
    let listaStatus: Status[]=new Array();
    listaStatus.push(new Status(1, "Pagamento aprovado"));
    listaStatus.push(new Status(2, "Pagamento recusado"));
    listaStatus.push(new Status(3, "Em rota de entrega"));
    listaStatus.push(new Status(4, "Aguardando retirada"));
    listaStatus.push(new Status(5, "Entregue"));
    listaStatus.push(new Status(6, "Cancelado"));
    return listaStatus;
  }
}
