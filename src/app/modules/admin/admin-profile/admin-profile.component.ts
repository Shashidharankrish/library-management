import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  adminForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<AdminProfileComponent>
  ) {
    this.adminForm = this.fb.group({
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
        this.adminForm.patchValue({
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
   
    if (this.adminForm.valid && this.currentUser) {
      const updatedAdminDetails: User = {
        ...this.currentUser,
        name: this.adminForm.value.name,
        username: this.adminForm.value.username,
        password: this.adminForm.value.password,
        email: this.adminForm.value.email,
        contact: this.adminForm.value.contact,
        location: this.adminForm.value.location,
      };
      this.userService.updateUser(updatedAdminDetails).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
