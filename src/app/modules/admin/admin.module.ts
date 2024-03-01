import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from 'src/app/modules/admin/sidebar/sidebar.component';
import { UserManagementComponent } from 'src/app/modules/admin/user-management/user-management.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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

import { BookManagementComponent } from './book-management/book-management.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { EditBookDialogComponent } from './edit-book-dialog/edit-book-dialog.component';
import { IssueBooksDialogComponent } from './issue-books-dialog/issue-books-dialog.component';
import { BorrowingHistoryDialogComponent } from './borrowing-history-dialog/borrowing-history-dialog.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminAuthGuard } from 'src/app/guards/admin-auth.guard';

const routes: Routes = [
  {
    path: '',

    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'users', component: UserManagementComponent },
      { path: 'books', component: BookManagementComponent },
      { path: '**', redirectTo: 'books' },
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
  MatInputModule
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    UserManagementComponent,
    BookManagementComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ConfirmationDialogComponent,
    AddBookDialogComponent,
    EditBookDialogComponent,
    IssueBooksDialogComponent,
    BorrowingHistoryDialogComponent,
    AdminProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ...modules,
  ],
})
export class AdminModule {}
