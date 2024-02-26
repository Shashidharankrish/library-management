import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(bookId: string): Observable<Book> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.get<Book>(url);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    const url = `${this.apiUrl}/${updatedBook.id}`;
    return this.http.put<Book>(url, updatedBook);
  }

  deleteBook(bookId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete(url);
  }
}
