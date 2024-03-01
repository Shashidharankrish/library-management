import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, BookStatus } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { BooksService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-issue-books-dialog',
  templateUrl: './issue-books-dialog.component.html',
  styleUrls: ['./issue-books-dialog.component.scss'],
})
export class IssueBooksDialogComponent implements OnInit {
  availableBooks: Book[] = [];
  selectedBooks: Book[] = [];
  borrowedBooks: Book[] = [];

  constructor(
    public dialogRef: MatDialogRef<IssueBooksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private booksService: BooksService,
    private userService: UserService 
  ) {}

  ngOnInit(): void {
    this.fetchAvailableBooks();
  }

  fetchAvailableBooks(): void {
    this.booksService.getAllBooks().subscribe((books) => {
      this.availableBooks = books;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  issueBooks(): void {
    if (!this.data.user.borrowedBooks) {
      this.data.user.borrowedBooks = [];
    }
    this.selectedBooks.forEach((book) => {
      book.status = BookStatus.borrowed;
    });
    this.data.user.borrowedBooks.push(...this.selectedBooks);

    this.userService.updateUser(this.data.user).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onSelectionChange(option: any): void {
    const bookId = option.value;
    if (option.selected) {
      this.selectedBooks.push(bookId);
    } else {
      const index = this.selectedBooks.indexOf(bookId);
      if (index != -1) {
        this.selectedBooks.splice(index, 1);
      }
    }
  }
  toggleSelection(book: Book): void {
    const index = this.selectedBooks.indexOf(book);
    if (index == -1) {
      this.selectedBooks.push(book);
    } else {
      this.selectedBooks.splice(index, 1);
    }
  }
  hasReachedBookLimit(user: User): boolean {
    return this.userService.hasReachedBookLimit(user);
  }
}
