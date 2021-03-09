/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalEditarProdutoComponent } from './modal-editar-produto.component';

describe('ModalEditarProdutoComponent', () => {
  let component: ModalEditarProdutoComponent;
  let fixture: ComponentFixture<ModalEditarProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
