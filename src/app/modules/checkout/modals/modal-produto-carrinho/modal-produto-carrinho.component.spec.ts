/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalProdutoCarrinhoComponent } from './modal-produto-carrinho.component';

describe('ModalProdutoCarrinhoComponent', () => {
  let component: ModalProdutoCarrinhoComponent;
  let fixture: ComponentFixture<ModalProdutoCarrinhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProdutoCarrinhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProdutoCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
