import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

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

const book: Book =   {
  name: 'Pinocho',
  author: 'Claudio',
  isbn: '',
  price: 15,
  amount: 2
};

describe('BookService', ()=> {

  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookService
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? storage[key] : null;
    } );

    spyOn(localStorage, 'setItem').and.callFake((key: string, value:string) =>{
      return storage[key] = value;
    });
  });

  afterAll(() => {
    httpMock.verify();
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  it('getbook return a list of book and does a get  method', ()=> {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');

    req.flush(listBook);
  });

  it('getBookFromCart return empty srray when localstorage is empty', ()=> {
    const listBook = service.getBooksFromCart();
    expect(listBook.length === 0).toBeTrue();
  });

  it('addbooks to cart successfully when the list   dont exist in thhe localstorage', () => {
    const toast = {
      fire: () => null
    } as any;

    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    });

    let listBook = service.getBooksFromCart();
    expect(listBook.length === 0).toBeTrue();

    service.addBookToCart(book);

    listBook = service.getBooksFromCart();
    expect(listBook.length === 1).toBeTrue();

    service.addBookToCart(book);

    expect(spy1).toHaveBeenCalled();
  })
});
