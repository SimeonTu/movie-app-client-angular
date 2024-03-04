import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, MatDialogModule, MatSnackBarModule, FormsModule, MatDividerModule],
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit{
  title = 'IFDb-Angular-client';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
    console.log("test");

    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  // This is the function that will open the dialog when the signup button is clicked  
  openUserLoginDialog(): void {
    console.log("test2");

    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}