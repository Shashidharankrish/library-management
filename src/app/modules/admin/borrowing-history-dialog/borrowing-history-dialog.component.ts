import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-borrowing-history-dialog',
  templateUrl: './borrowing-history-dialog.component.html',
  styleUrls: ['./borrowing-history-dialog.component.scss'],
})
export class BorrowingHistoryDialogComponent implements OnInit {
  borrowingHistory: any[] = [];
  userId: string;
  displayedColumns: string[] = ['title', 'borrowedDate', 'return'];

  constructor(
    public dialogRef: MatDialogRef<BorrowingHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {

    this.userId = data.user.id;
  }

  ngOnInit(): void {
    this.fetchBorrowingHistory();
  }

  fetchBorrowingHistory(): void {
    this.userService.getBorrowingHistory(this.userId).subscribe((history) => {
      this.borrowingHistory = history;
    });
  }

  returnBook(borrowingId: string): void {
    this.userService.returnBook(this.userId, borrowingId).subscribe(
      () => {
        this.fetchBorrowingHistory();
        this.snackBar.open('Book returned successfully!', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar',
          horizontalPosition: 'right'
        });
      },
      (error) => {
        console.error('Error returning book:', error);
        this.snackBar.open(
          'Failed to return book. Please try again later.',
          'Close',
          {
            duration: 3000,
            panelClass: 'error-snackbar',
            horizontalPosition: 'right'
          }
        );
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
