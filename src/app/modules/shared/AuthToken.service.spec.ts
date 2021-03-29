/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthTokenService } from './AuthToken.service';

describe('Service: AuthToken', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTokenService]
    });
  });

  it('should ...', inject([AuthTokenService], (service: AuthTokenService) => {
    expect(service).toBeTruthy();
  }));
});
