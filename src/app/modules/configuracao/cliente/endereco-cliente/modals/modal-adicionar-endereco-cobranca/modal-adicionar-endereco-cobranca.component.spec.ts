/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalAdicionarEnderecoCobrancaComponent } from './modal-adicionar-endereco-cobranca.component';

describe('ModalAdicionarEnderecoCobrancaComponent', () => {
  let component: ModalAdicionarEnderecoCobrancaComponent;
  let fixture: ComponentFixture<ModalAdicionarEnderecoCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdicionarEnderecoCobrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionarEnderecoCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
