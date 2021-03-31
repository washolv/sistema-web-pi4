import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) { }

  /*public cadastrarUsuario(funcionario: Funcionario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, funcionario);
  }*/

}
