import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VendidosCategoria, VendidosMes } from '../modules/dashboard/dashboard-funcionario/dashboard-administrador/models/VendidosCategoria';

@Injectable({
  providedIn: 'root'
})
export class RelatorioVendasService {
  apiUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) {
  }

  public getByCategory(inicialDate: Date, endDate: Date): Observable<VendidosCategoria[]>{
    console.log(inicialDate)
    console.log(endDate)
    const httpOptions = {
      headers: new HttpHeaders({ dataInicio: inicialDate.toString(),dataFim: endDate.toString() }),
    };
    return this.http.get<VendidosCategoria[]>(`${this.apiUrl}/vendas/categoriasPorcentagem`, httpOptions);
  }
  public getByMonth(inicialDate: Date, endDate: Date): Observable<VendidosMes[]>{
    const httpOptions = {
      headers: new HttpHeaders({ dataInicio: inicialDate.toString(),dataFim: endDate.toString() }),
    };
    return this.http.get<VendidosMes[]>(`${this.apiUrl}/vendas/porMes`, httpOptions);
  }
}
