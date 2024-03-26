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
  previewImage: string | ArrayBuffer | null = null;
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
    price: 0,
    imageURL: '',
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
      price: [this.book.price, Validators.required],
      imageURL: [this.book.imageURL, Validators.required],
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
      price: this.book.price,
      imageURL: this.book.imageURL,
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
  onFileSelected(event: any) {
    // Sir!  since json-server doesnt support fileupload, here i am just saving the file name to the imageURL
    // I tried saving the image to the assets folder with json-server, Later i discovered, nodejs can only handle image uploads
    // if you still want to save image in the book object just uncomment the function onFileSelected2() and replace the functionCall in template also

    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result; 
        this.bookForm.patchValue({
          imageURL: file.name, 
        });
      };
      reader.readAsDataURL(file);
    }
  }
  

  // onFileSelected2(event: any) {
  
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

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
