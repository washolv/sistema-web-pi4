import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  public buscar(cep: string): Observable<any> {
    return this.http.get(`//viacep.com.br/ws/${cep}/json/`);
  }
}
