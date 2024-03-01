export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: string;
  publisher: string;
  language: string;
  pages: number;
  isbn: string;
  status: BookStatus;
  quantity: number;
  price: number;
  imageURL: string
}

export enum BookStatus {
  available = 'available',
  borrowed = 'borrowed',
}
