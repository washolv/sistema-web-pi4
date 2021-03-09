/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalExcluirProdutoComponent } from './modal-excluir-produto.component';

describe('ModalExcluirProdutoComponent', () => {
  let component: ModalExcluirProdutoComponent;
  let fixture: ComponentFixture<ModalExcluirProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExcluirProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExcluirProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
