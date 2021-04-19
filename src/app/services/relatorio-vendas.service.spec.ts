/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelatorioVendasService } from './relatorio-vendas.service';

describe('Service: RelatorioVendas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatorioVendasService]
    });
  });

  it('should ...', inject([RelatorioVendasService], (service: RelatorioVendasService) => {
    expect(service).toBeTruthy();
  }));
});
