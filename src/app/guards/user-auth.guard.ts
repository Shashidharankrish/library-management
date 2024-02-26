import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUserString = localStorage.getItem('currentUser');

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.role === 'user') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
