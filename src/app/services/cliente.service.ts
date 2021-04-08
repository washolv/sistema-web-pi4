import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../modules/cliente/models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) { }


  public buscarCliente(id: number): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes/${id}`);
  }
  public buscarClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }
  public salvarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/clientes`, cliente);
  }
  public editarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiUrl}/clientes`, cliente.nome);
  }
  public deleteCliente(id?: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/clientes/${id}`);
  }

  public emailNaoCadastrado(email: string)/*:Observable<any>*/{
    const httpOptions = {
      headers: new HttpHeaders({'email': email })
    };
     return this.http.get<Cliente>(`${this.apiUrl}/usuarios`, httpOptions);
  }
  public cpfNaoCadastrado(cpf: string)/*:Observable<any>*/ {
   const httpOptions = {
      headers: new HttpHeaders({'cpf': cpf })
    };
     return this.http.get<Cliente>(`${this.apiUrl}/clientes/cpf`, httpOptions)
  };
}
