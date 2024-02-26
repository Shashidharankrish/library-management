import { Book } from "./book.model";
import { User } from "./user.model";

export interface Transaction {
  id: string;
  book: Book;
  user: User;
  status: TransactionStatus;
  borrowedDate: Date;
  returnedDate?: Date;
}

export enum TransactionStatus {
  Borrowed = 'Borrowed',
  Returned = 'Returned',
}
