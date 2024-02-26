import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent {
  @Input() libraryName: string = '';
  @Input() username: string = '';

  constructor(private dialog: MatDialog, private router: Router) {}
  openAdminProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '700px',
      height: '700px',
    });
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
