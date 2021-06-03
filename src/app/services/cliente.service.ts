import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente, EnderecoCliente } from '../modules/cliente/models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) { }


  public buscarCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/find/${id}`);
  }
  public buscarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }
  public salvarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/clientes`, cliente);
  }
  public editarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/clientes`, cliente);
  }
  public deleteCliente(id?: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/clientes/${id}`);
  }

  //CRUD DE ENDEREÇOS DO CLIENTE
  public adicionarEndereco(idCliente: number, endereco: EnderecoCliente): Observable<EnderecoCliente> {
    return this.http.post<EnderecoCliente>(`${this.apiUrl}/enderecos/cliente/${idCliente}`, endereco);
  }
  public editarEndereco(id:number,endereco: EnderecoCliente): Observable<EnderecoCliente> {
    const httpOptions = {
      headers: new HttpHeaders({ 'id': id.toString() })
    };
    return this.http.put<EnderecoCliente>(`${this.apiUrl}/enderecos`, endereco, httpOptions);
  }
  public buscarEnderecos(idCliente: number): Observable<EnderecoCliente[]> {
    return this.http.get<EnderecoCliente[]>(`${this.apiUrl}/enderecos/cliente/${idCliente}`);
  }
  public buscarEnderecosAtivos(idCliente: number): Observable<EnderecoCliente[]> {
    return this.http.get<EnderecoCliente[]>(`${this.apiUrl}/enderecos/ativos/cliente/${idCliente}`);
  }
  public buscarEndereco(idEndereco: number): Observable<EnderecoCliente[]> {
    return this.http.get<EnderecoCliente[]>(`${this.apiUrl}/enderecos/${idEndereco}`);
  }

  public emailNaoCadastrado(email: string)/*:Observable<any>*/ {
    const httpOptions = {
      headers: new HttpHeaders({ 'email': email })
    };
    return this.http.get<Cliente>(`${this.apiUrl}/usuarios`, httpOptions);
  }
  public cpfNaoCadastrado(cpf: string)/*:Observable<any>*/ {
    const httpOptions = {
      headers: new HttpHeaders({ 'cpf': cpf })
    };
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/cpf`, httpOptions)
  };
  public comparaSenhas(senha: string, id: number)/*:Observable<any>*/ {
    const httpOptions = {
      headers: new HttpHeaders({ 'senha': senha })
    };
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/buscarSenha/${id}`, httpOptions)
  };
}
