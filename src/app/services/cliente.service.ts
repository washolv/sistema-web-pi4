import { HttpClient } from '@angular/common/http';
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

  public editarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiUrl}/cliente`, cliente);
  }
  public buscarCliente(id: number): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/cliente/${id}`);
  }
  public buscarClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/cliente`);
  }

}
