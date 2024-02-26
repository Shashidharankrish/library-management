import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name:string= ''
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = 'user';
  contact: string = '';
  location: string = '';
  borrowLimit: number = 5;
  borrowedBooks= [[]]

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    if (!this.username || !this.password || !this.contact || !this.location || !this.name) {
      this.snackBar.open('All fields are required', 'Close', {
        duration: 3000,
      });
      return;
    }

    const user = {
      name: this.name,
      username: this.username,
      password: this.password,
      role: this.role,
      contact: this.contact,
      location: this.location,
      borrowLimit: this.borrowLimit,
      borrowedBooks: this.borrowedBooks,
      email: this.email,
    };

    this.authService.register(user).subscribe(
      () => {
        this.snackBar.open('User registered successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error registering user:', error);
        this.snackBar.open('Error registering user. Please try again later.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
