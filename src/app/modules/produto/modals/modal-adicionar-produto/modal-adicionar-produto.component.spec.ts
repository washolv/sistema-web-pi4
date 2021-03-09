/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalAdicionarProdutoComponent } from './modal-adicionar-produto.component';

describe('ModalAdicionarProdutoComponent', () => {
  let component: ModalAdicionarProdutoComponent;
  let fixture: ComponentFixture<ModalAdicionarProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdicionarProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
