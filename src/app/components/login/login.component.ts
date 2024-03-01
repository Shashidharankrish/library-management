import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }
  

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const credentials = {
        username: loginForm.value.username,
        password: loginForm.value.password,
      };

      this.authService.login(credentials).subscribe(
        (users) => {
          if (users && users.length > 0) {
            const user = users[0];
            localStorage.setItem('currentUser', JSON.stringify(user));

            switch (user.role) {
              case 'admin':
                this.router.navigate(['/admin']);
                break;
              case 'user':
                this.router.navigate(['/user']);
                break;
              default:
                this.router.navigate(['/default']);
            }
          } else {
           
            this.snackBar.open('Invalid username or password', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
            });
          }
        },
        (error) => {
          console.error('Login failed:', error);
         
          this.snackBar.open('Login failed. Please try again later.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
          });
        }
      );
    }
  }
}
