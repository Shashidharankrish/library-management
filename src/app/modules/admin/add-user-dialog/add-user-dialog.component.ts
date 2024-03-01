import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      bookLimit: ['', Validators.required],
      borrowedBooks: [[]],
    });
  }

  ngOnInit(): void {}

  addUser(): void {
    if (this.userForm.valid) {
   
      this.dialogRef.close(this.userForm.value);

      this.snackBar.open('User added successfully!', 'Close', {
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
}
