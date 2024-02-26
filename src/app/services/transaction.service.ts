import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getTransactionHistory(userId: string): Observable<Transaction[]> {
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<Transaction[]>(url);
  }
  
  createTransaction(transaction: { userId: string, bookIds: string[]}): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  updateTransaction(
    transactionId: string,
    updatedTransaction: Transaction
  ): Observable<Transaction> {
    const url = `${this.apiUrl}/${transactionId}`;
    return this.http.put<Transaction>(url, updatedTransaction);
  }

  deleteTransaction(transactionId: string): Observable<any> {
    const url = `${this.apiUrl}/${transactionId}`;
    return this.http.delete(url);
  }
}
