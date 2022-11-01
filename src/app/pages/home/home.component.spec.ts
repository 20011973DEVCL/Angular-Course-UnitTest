import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';

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
];

const bookServiceMock = {
  getBooks:() => of(listBook)
}


describe('Home Component', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        {provide: BookService, useValue: bookServiceMock}
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(HomeComponent);
    component =  fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Home Component', () => {
    expect(component).toBeTruthy();
  });

  // Unit Test con espia y subscribe
  it('getBook get books from the subscription 1', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    const listBook: Book[] = [];
    const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));
    component.getBooks();
    expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length === 0).toBeTrue();
  });

  // Unit Test con espia y subscribe
  it('getBook get books from the subscription Spy y Subscribe', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));
    component.getBooks();
    expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length === 3).toBeTrue();
  });

  // Unit Test con Mock en Servicio
  it('getBook get books from the subscription with Service Mock', () => {
    component.getBooks();
    expect(component.listBook.length === 3).toBeTrue();
  });
});
