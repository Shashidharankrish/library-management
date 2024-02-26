import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BorrowingHistoryDialogComponent } from './borrowing-history-dialog/borrowing-history-dialog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserAuthGuard } from 'src/app/guards/user-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    canActivate: [UserAuthGuard],
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', component: AvailableBooksComponent },
      { path: 'borrowed', component: BorrowingHistoryDialogComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '**', redirectTo: 'books' }
    ],
  },
];

const modules = [
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatListModule,
  MatTooltipModule,
  MatFormFieldModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    BorrowingHistoryDialogComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    UserNavbarComponent,
    AvailableBooksComponent,
    UserProfileComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ...modules],
})
export class UserModule {}
