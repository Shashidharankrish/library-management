import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit {
  userForm: FormGroup;
  user: User = {
    id: '',
    name: '',
    username: '',
    password: '',
    role: UserRole.User,
    email: '',
    contact: '',
    location: '',
    bookLimit: '',
    borrowedBooks: [],
  }; 

  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
   
    this.userForm = this.formBuilder.group({
      id: [this.user.id, Validators.required],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      email: [this.user.email, Validators.required],
      contact: [this.user.contact, Validators.required],
      location: [this.user.location, Validators.required],
      name: [this.user.name, Validators.required],
      role: [this.user.role, Validators.required],
      bookLimit: [this.user.bookLimit, Validators.required],
      borrowedBooks: [[]], 
    });
  }

  ngOnInit(): void {
    this.user = this.data.user;
    this.userForm.patchValue({
      id: this.user.id,
      username: this.user.username,
      password: this.user.password,
      role: this.user.role,
      email: this.user.email,
      contact: this.user.contact,
      location: this.user.location,
      name: this.user.name,
      bookLimit: this.user.bookLimit,
    });
  }

  editUser(): void {
    if (this.userForm.valid) {
      const updatedUserData = {
        ...this.user,
        ...this.userForm.value,
      };
      this.dialogRef.close(updatedUserData);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
