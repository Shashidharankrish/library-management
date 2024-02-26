import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, BookStatus } from 'src/app/models/book.model';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.scss'],
})
export class EditBookDialogComponent implements OnInit {
  bookForm: FormGroup;
  book: Book = {
    id: '',
    title: '',
    author: '',
    genre: '',
    year: '',
    publisher: '',
    language: '',
    pages: 0,
    isbn: '',
    status: BookStatus.available,
    quantity: 0,
    price: 0
  }; 

  constructor(
    private dialogRef: MatDialogRef<EditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.bookForm = this.formBuilder.group({
      id: [this.book.id, Validators.required],
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      genre: [this.book.genre, Validators.required],
      year: [this.book.year, Validators.required],
      publisher: [this.book.publisher, Validators.required],
      language: [this.book.language, Validators.required],
      pages: [this.book.pages, Validators.required],
      isbn: [this.book.isbn, Validators.required],
      status: [this.book.status, Validators.required],
      quantity: [this.book.quantity, Validators.required],
      price: [this.book.price, Validators.required]  
    });
  }

  ngOnInit(): void {
    this.book = this.data.book;
    this.bookForm.patchValue({
      id: this.book.id,
      title: this.book.title,
      author: this.book.author,
      genre: this.book.genre,
      year: this.book.year,
      publisher: this.book.publisher,
      language: this.book.language,
      pages: this.book.pages,
      isbn: this.book.isbn,
      status: this.book.status,
      quantity: this.book.quantity,
      price: this.book.price
    });
  }

  editBook(): void {
    if (this.bookForm.valid) {
      const updatedUserData = {
        ...this.book,
        ...this.bookForm.value,
      };
      this.dialogRef.close(updatedUserData);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
