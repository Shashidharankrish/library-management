import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  libraryName: string = 'Library Management System';
  adminName: string = '';

  constructor() {}

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser && currentUser.name) {
        this.adminName = currentUser.name;
      } else {
        console.error('Username not found in localStorage');
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }
}
