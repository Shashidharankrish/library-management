import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserProfileComponent>
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const userId = JSON.parse(userData).id;
      this.userService.getUserById(userId).subscribe((user) => {
        this.currentUser = user;
        this.userForm.patchValue({
          name: user.name,
          username: user.username,
          password: user.password,
          email: user.email,
          contact: user.contact,
          location: user.location,
        });
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid && this.currentUser) {
      const updatedUserDetails: User = {
        ...this.currentUser,
        name: this.userForm.value.name,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        email: this.userForm.value.email,
        contact: this.userForm.value.contact,
        location: this.userForm.value.location,
      };
      this.userService.updateUser(updatedUserDetails).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
