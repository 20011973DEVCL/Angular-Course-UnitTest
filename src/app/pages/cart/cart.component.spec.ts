import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CartComponent } from './cart.component';

import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

const listBook: Book[]= [
  {
    name: 'Pinocho',
    author: 'Claudio',
    isbn: '',
    price: 15,
    amount: 2
  },
  {
    name: 'Isabel',
    author: 'Yo',
    isbn: '',
    price: 20,
    amount: 1
  },
  {
    name: 'London',
    author: 'Cindy',
    isbn: '',
    price: 8,
    amount: 7
  }
]

describe('Cart Component', () => {
  let service: BookService;
  let component: CartComponent
  let fixture:  ComponentFixture<CartComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [
        CartComponent
      ],
      providers: [
        BookService
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CartComponent);
    component =  fixture.componentInstance;
    service = fixture.debugElement.injector.get(BookService);
    spyOn(service,'getBooksFromCart').and.callFake(() => listBook);
    // No se deben Ejecutarse servicios desde una prueba unitaria, solo probar el componente el servicio
    // se puede probar con Mocks.
    // Para cuando un servicio este dentro de un OnInit del componente se debe crear un espia.
    fixture.detectChanges();
  });

  it('CartComponent', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice', () => {
    const totalPrice=component.getTotalPrice(listBook);
    // expect(totalPrice).toBe(106);
    expect(totalPrice).toBeGreaterThan(0);
  });

  it('onInputNumberChange incremets correctly', () => {
    const action = 'plus';
    const book = listBook[0];

    const spy1 =  spyOn(service, 'updateAmountBook').and.callFake(() => null );
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    // expect(book.amount).toBe(2);

    component.onInputNumberChange(action,book);

    // expect(book.amount === 3).toBeTrue();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book = listBook[0];

    const spy1 =  spyOn(service, 'updateAmountBook').and.callFake(() => null );
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    // expect(book.amount === 3).toBeTrue();

    component.onInputNumberChange(action,book);

    // expect(book.amount === 2).toBeTrue();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  // Forma recomendada para probar funciones privadas
  it('onClearBooks works OK', () => {
    const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
    const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake( () => null);

    component.listCartBook = listBook;
    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  // Forma No recomendada para probar funciones privadas
  it('_clearListCartBook works OK', () => {
    const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
    component.listCartBook = listBook;
    component["_clearListCartBook"]();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();
  });

});

