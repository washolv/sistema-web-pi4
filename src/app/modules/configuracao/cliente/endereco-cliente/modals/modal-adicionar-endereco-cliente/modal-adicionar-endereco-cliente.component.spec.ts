/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalAdicionarEnderecoClienteComponent } from './modal-adicionar-endereco-cliente.component';

describe('ModalAdicionarEnderecoClienteComponent', () => {
  let component: ModalAdicionarEnderecoClienteComponent;
  let fixture: ComponentFixture<ModalAdicionarEnderecoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdicionarEnderecoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionarEnderecoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
