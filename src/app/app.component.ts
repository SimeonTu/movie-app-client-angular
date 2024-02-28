import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, MatDialogModule, MatSnackBarModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IFDb-Angular-client';


  constructor(public dialog: MatDialog) { }

  // ngOnInit(): void {
  //   this.dialog.open(UserRegistrationFormComponent, {
  //     // Assigning the dialog a width
  //     width: '280px'
  //   });
  // }

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
}