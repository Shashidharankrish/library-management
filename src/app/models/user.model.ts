import { Book } from './book.model';

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
  email: string;
  contact: string;
  location: string;
  bookLimit: any;
  borrowedBooks: Book[];
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
