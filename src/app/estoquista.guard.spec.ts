import { TestBed } from '@angular/core/testing';

import { EstoquistaGuard } from './estoquista.guard';

describe('EstoquistaGuard', () => {
  let guard: EstoquistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EstoquistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
