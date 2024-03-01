import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Book, BookStatus } from '../models/book.model';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: string): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User | null> {
    if (user.role === 'user') {
      let bookLimit = 5 - user.borrowedBooks.length;
      bookLimit = Math.max(bookLimit, 0);
      user.bookLimit = bookLimit.toString();
    }

    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }
  getBorrowingHistory(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http
      .get<any[]>(url)
      .pipe(map((user: any) => user.borrowedBooks));
  }

  returnBook(userId: string, borrowingId: string): Observable<any> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      mergeMap((user: User) => {
        const borrowedBooks = user.borrowedBooks.filter(
          (book) => book.id !== borrowingId
        );
        const updatedUser = {
          ...user,
          borrowedBooks,
        };
        return this.http.put(`${this.apiUrl}/${userId}`, updatedUser);
      })
    );
  }

  hasReachedBookLimit(user: User): boolean {
    return (
      user.borrowedBooks.filter((book) => book.status === 'borrowed').length >=
      5
    );
  }

  borrowBook(user: User, book: Book): Observable<any> {
    return this.http.get<User>(`${this.apiUrl}/${user.id}`).pipe(
      mergeMap((user: User) => {
        book.status = BookStatus.borrowed;
        const borrowedBooks = [...user.borrowedBooks, book];
        const updatedUser = {
          ...user,
          borrowedBooks,
        };
        return this.http.put(`${this.apiUrl}/${user.id}`, updatedUser);
      })
    );
  }
}
