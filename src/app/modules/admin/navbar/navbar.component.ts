import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() libraryName: string = '';
  @Input() adminName: string = '';

  constructor(private dialog: MatDialog, private router: Router) {}
  openAdminProfile(): void {
    this.dialog.open(AdminProfileComponent, {
      width: '700px',
      height: '700px',
    });
  }
  logout() {
    localStorage.removeItem('currentUser')
    this.router.navigateByUrl('/login')
  }
}
