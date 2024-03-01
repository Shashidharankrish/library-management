import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User, UserRole } from 'src/app/models/user.model';
import { Book, BookStatus } from 'src/app/models/book.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-borrowing-history-dialog',
  templateUrl: './borrowing-history-dialog.component.html',
  styleUrls: ['./borrowing-history-dialog.component.scss'],
})
export class BorrowingHistoryDialogComponent implements OnInit {
  borrowingHistory: any[] = [];
  userId: string = '';
  user: User | null = null;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userIdFromStorage = localStorage.getItem('currentUser');

    if (userIdFromStorage) {
      const currentUser = JSON.parse(userIdFromStorage);
      this.userService.getUserById(currentUser.id).subscribe(
        (user: User) => {
          this.user = user; // Assign the user object
          this.borrowingHistory = user.borrowedBooks;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  fetchBorrowingHistory(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.borrowingHistory = user.borrowedBooks;
      },
      (error) => {
        console.error('Error fetching borrowing history:', error);
      }
    );
  }

  returnBook(book: Book): void {
    if (!this.user) {
      console.error('User not available');
      return;
    }

    if (book.status === BookStatus.borrowed) {
      book.status = BookStatus.available;

      // Remove the returned book from the list of borrowed books
      this.user.borrowedBooks = this.user.borrowedBooks.filter(
        (b) => b.id !== book.id
      );

      // Update the user on the server
      this.userService.updateUser(this.user).subscribe(
        () => {
          this.snackBar.open('Book returned successfully!', 'Close', {
            duration: 3000,
            panelClass: 'success-snackbar',
            horizontalPosition: 'right',
          });
          this.borrowingHistory = this.user ? this.user.borrowedBooks : [];
        },
        (error) => {
          console.error('Error returning book:', error);
        }
      );
    } else {
      this.snackBar.open('Book is not currently borrowed.', 'Close', {
        duration: 3000,
        panelClass: 'warning-snackbar',
        horizontalPosition: 'right',
      });
    }
  }
}
