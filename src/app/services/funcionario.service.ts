import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public editarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/funcionarios`, funcionario);
  }
  public postFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.apiUrl}/funcionarios`, funcionario);
  }
  public buscarFuncionarioPorNome(nome: string): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/funcionarios/${nome}`);
  }
  public emailNaoCadastrado(email: string): boolean {
    const httpOptions = {
      headers: new HttpHeaders({ 'email': email })
    };
     this.http.get<Funcionario>(`${this.apiUrl}/usuarios`, httpOptions).subscribe(response =>{
      if(!response){
        return true;
      }
      return false;
    });
    return false;
  }
  public cpfNaoCadastrado(cpf: string): boolean {
    const httpOptions = {
      headers: new HttpHeaders({'cpf': cpf })
    };
     this.http.get<Funcionario>(`${this.apiUrl}/funcionarios/cpf`, httpOptions).subscribe(response =>{
      if(!response){
        return false;
      }
      return false;
    });
    return false;
  }
  //FALTA A IRRESPONSAVEL DA DEBORA FAZER
  public buscarFuncionarioPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/funcionarios/find/${id}`);
  }
  public buscarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/funcionarios`);
  }
}
