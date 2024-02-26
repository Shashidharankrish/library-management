import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  libraryName: string = 'Library Management System';
  username: string = '';

  constructor() {}

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser && currentUser.name) {
        this.username = currentUser.name;
      } else {
        console.error('Username not found in localStorage');
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }
}
