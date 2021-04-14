/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnderecoClienteComponent } from './endereco-cliente.component';

describe('EnderecoClienteComponent', () => {
  let component: EnderecoClienteComponent;
  let fixture: ComponentFixture<EnderecoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
