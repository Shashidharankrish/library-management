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
      imageURL: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addBook(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
      this.snackBar.open('Book added successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
      });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar',
        horizontalPosition: 'right',
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onFileSelected(event: any) {
    // Sir!  since json-server doesnt support fileupload, here i am just saving the file name to the imageURL
    // I tried saving the image to the assets folder with json-server, Later i discovered, nodejs can only handle image uploads
    // if you still want to save image in the book object just uncomment the function onFileSelected2() and replace the functionCall in template also

    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.bookForm.patchValue({
          imageURL: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  // onFileSelected2(event: any) {
  //   // since json-server doesnt support fileupload, here i am just saving the file name to the imageURL

  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.bookForm.patchValue({
  //         imageURL: reader.result,
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
}
