import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { IFDbAPIservice } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatDialogModule, MatSnackBarModule, FormsModule],
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
  * Input property to store user login data.
  */
  @Input() userData = { username: '', password: '' };

  /**
   * Constructs a new UserLoginFormComponent instance.
   * @param fetchApiData - The service for fetching API data.
   * @param dialogRef - Reference to the dialog opened by the parent component.
   * @param snackBar - Reference to the snackbar component for displaying messages.
   * @param router - The Angular router service for navigation.
   */
  constructor(
    public fetchApiData: IFDbAPIservice,
    public dialogRef: MatDialogRef<any>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
  }

  /**
   * Sends user login data to the backend for authentication.
   * Displays success or error messages accordingly.
   */
  login(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)

      console.log(result);

      // save username and token in local storage
      localStorage.setItem("user", result.user.Username)
      localStorage.setItem("token", result.token)

      // This will close the modal on success!
      this.dialogRef.close();

      // display success snackbar
      this.snackBar.open("Successfully logged in.", 'OK', {
        duration: 2000
      });

      // navigate to "movies" page
      this.router.navigate(["movies"])

    }, (result) => {
      console.log(result);
      this.snackBar.open("There was a problem with logging in, please try again later.", 'OK', {
        duration: 2000
      });
    });
  }

}