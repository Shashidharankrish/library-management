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

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
   
    const userIdFromStorage = localStorage.getItem('currentUser');

    if (userIdFromStorage) {
      const currentUser = JSON.parse(userIdFromStorage);
      this.userId = currentUser.id;

     
      this.fetchBorrowingHistory();
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  fetchBorrowingHistory(): void {
  
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        console.log(user.borrowedBooks)
     
        this.borrowingHistory = user.borrowedBooks;

      },
      (error) => {
        console.error('Error fetching borrowing history:', error);
      }
    );
  }

  returnBook(book: Book): void {
   console.log(book)
    if (book.status === 'available') {
     
      book.status = BookStatus.available;

     
      const updatedUser: User = {
        id: this.userId,
        name: '',
        username: '',
        password: '',
        role: UserRole.User,
        email: '',
        contact: '',
        location: '',
        bookLimit: 0,
        borrowedBooks: this.borrowingHistory,
      };

    
      this.userService.updateUser(updatedUser).subscribe(
        () => {
         this.snackBar.open('Updated successfully!', 'Close', {
           duration: 3000,
           panelClass: 'success-snackbar',
           horizontalPosition: 'right',
         });
        },
        (error) => {
          console.error('Error returning book:', error);
        }
      );
    } else {
      this.snackBar.open('Book returned successfully!', 'Close', {
        duration: 3000,
        panelClass: 'success-snackbar',
        horizontalPosition: 'right',
      });
      console.log('This book is not currently borrowed.');
    }
  }
}
