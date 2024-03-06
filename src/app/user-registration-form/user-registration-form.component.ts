import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IFDbAPIservice } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

/**
 * Component for displaying and handling user registration form.
 */
@Component({
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Input property to store user registration data.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs a new UserRegistrationFormComponent instance.
   * @param fetchApiData - The service for fetching API data.
   * @param dialogRef - Reference to the dialog opened by the parent component.
   * @param snackBar - Reference to the snackbar component for displaying messages.
   */
  constructor(
    public fetchApiData: IFDbAPIservice,
    public dialogRef: MatDialogRef<AppComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
  }

  /**
   * Sends user registration data to the backend for processing.
   * Displays success or error messages accordingly.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      console.log(result);
      this.dialogRef.close(); // This will close the modal on success!

      this.snackBar.open("You've successfully made an account!\nYou can now login using your details.", 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open("There was a problem with signing in, please try again later.", 'OK', {
        duration: 2000
      });
    });
  }

}