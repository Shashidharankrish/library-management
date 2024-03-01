import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.scss'],
})
export class AvailableBooksComponent implements OnInit {
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['title', 'author', 'genre', 'actions'];
  books: Book[] = [];


  constructor(
    private booksService: BooksService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.booksService.getAllBooks().subscribe((books) => {
      this.books = books;
      this.dataSource = new MatTableDataSource(books);
    });
  }

  borrowBook(book: Book): void {
  
    const currentUser: User = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    
    if (currentUser && currentUser.role === 'user') {
    
      this.userService.borrowBook(currentUser, book).subscribe(
        () => {
          this.snackBar.open('Book borrowed successfully!', 'Close', {
            duration: 3000,
            panelClass: 'success-snackbar',
            horizontalPosition: 'center',
          });
        },
        (error) => {
          console.error('Error borrowing book:', error);
          this.snackBar.open(
            'Failed to borrow book. Please try again later.',
            'Close',
            {
              duration: 3000,
              panelClass: 'error-snackbar',
              horizontalPosition: 'right',
            }
          );
        }
      );
    } else {
      this.snackBar.open('Please login as a user to borrow books.', 'Close', {
        panelClass: 'error-snackbar',
        duration: 3000,
        horizontalPosition: 'right',
      });
    }
  }
}
