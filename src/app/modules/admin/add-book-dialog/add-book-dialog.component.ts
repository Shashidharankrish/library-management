import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddBookDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', Validators.required],
      publisher: ['', Validators.required],
      language: ['', Validators.required],
      pages: ['', Validators.required],
      isbn: ['', Validators.required],
      status: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addBook(): void {
    if (this.bookForm.valid) {
    
      this.dialogRef.close(this.bookForm.value);

    
      this.snackBar.open('Book added successfully!', 'Close', {
        duration: 3000,
      });
    } else {
   
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar', 
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
