/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalEditarEnderecoClienteComponent } from './modal-editar-endereco-cliente.component';

describe('ModalEditarEnderecoClienteComponent', () => {
  let component: ModalEditarEnderecoClienteComponent;
  let fixture: ComponentFixture<ModalEditarEnderecoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarEnderecoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarEnderecoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
