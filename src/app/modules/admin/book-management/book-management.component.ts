import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/book.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss'],
})
export class BookManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'genre',
    'year',
    'quantity',
    'actions',
  ];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();

  books: Book[] = [];

  constructor(
    private booksService: BooksService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.booksService.getAllBooks().subscribe((books) => {
      this.books = books;
      this.dataSource = new MatTableDataSource(books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.booksService.addBook(result).subscribe(() => {
          this.loadBooks();
          this.openSnackBar('Book added successfully');
        });
      }
    });
  }

  openEditBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '500px',
      data: { book },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.booksService.updateBook(result).subscribe(() => {
          this.loadBooks();
          this.openSnackBar('Book updated successfully');
        });
      }
    });
  }

  deleteBook(bookId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this book?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.booksService.deleteBook(bookId).subscribe(() => {
          this.loadBooks();
          this.openSnackBar('Book deleted successfully');
        });
      }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
