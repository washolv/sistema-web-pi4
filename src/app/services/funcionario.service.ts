import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../modules/funcionario/models/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) { }

  public editarFuncionario(cliente: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.apiUrl}/Funcionario`, Funcionario);
  }
  public buscarFuncionario(id: number): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/Funcionario/${id}`);
  }
  public buscarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/Funcionario`);
  }
}
