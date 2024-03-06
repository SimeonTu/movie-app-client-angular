import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { IFDbAPIservice } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCardSubtitle,
    MatCardTitle,
    MatCard,
    MatGridTile,
    MatGridList,
    MatIcon,
    CommonModule,
    MatLabel,
    MatFormField,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})

export class ProfileViewComponent implements OnInit {

  /**
   * Form control for the username input field.
   */
  usernameForm = new FormControl('', [Validators.required]);

  /**
   * Form control for the password input field.
   */
  passwordForm = new FormControl('', [Validators.required]);

  /**
   * Form control for the email input field.
   */
  emailForm = new FormControl('', [Validators.required, Validators.email]);

  /**
   * Form control for the birthday input field.
   */
  birthdayForm = new FormControl('', [Validators.required]);

  /**
   * The current username retrieved from local storage.
   */
  username: any = localStorage.getItem('user');

  /**
   * Object representing the user profile data.
   */
  user: any;

  /**
   * Array containing all movies retrieved from the API.
   */
  movies: any;

  /**
   * Object containing the favorite movies of the user.
   */
  favMovies: any = {};

  /**
   * Current range value for responsive design.
   */
  currentRange?: string = "2";

  /**
   * Flag indicating whether data is still loading.
   */
  loading: boolean = true;

  /**
   * Timer value for the delete account button cooldown.
   */
  timer: any = 5;

  /**
   * Interval ID for the cooldown timer.
   */
  cooldown: any;

  /**
   * Flag indicating whether the username is being changed.
   */
  changeUsername: boolean = false;

  /**
   * Flag indicating whether the password is being changed.
   */
  changePassword: boolean = false;

  /**
   * Flag indicating whether the email is being changed.
   */
  changeEmail: boolean = false;

  /**
   * Flag indicating whether the birthday is being changed.
   */
  changeBirthday: boolean = false;

  /**
   * Flag indicating whether the account deletion is confirmed.
   */
  deleteAccount: boolean = false;

  /**
   * New username value for updating the user profile.
   */
  newUsername: string = "";

  /**
   * New password value for updating the user profile.
   */
  newPassword?: number;

  /**
   * New email value for updating the user profile.
   */
  newEmail: string = "";

  /**
   * New birthday value for updating the user profile.
   */
  newBirthday: any;

  /**
   * Minimum date allowed for the birthday input field.
   */
  minDate: Date = new Date('1900-01-01');

  /**
   * Maximum date allowed for the birthday input field.
   */
  maxDate: Date = new Date();

  constructor(
    public fetchApiData: IFDbAPIservice,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   */

  async ngOnInit() {

    // observe for different screen sizes to make the app responsive
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(() => {

        if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
          this.currentRange = '1';
          console.log(this.currentRange);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
          this.currentRange = '3';
          console.log(this.currentRange);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
          this.currentRange = '4';
          console.log(this.currentRange);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
          this.currentRange = '5';
          console.log(this.currentRange);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
          this.currentRange = '6';
          console.log(this.currentRange);
        }
      });

    try {
      // Wait for both async functions to complete using await
      await this.getMovies()
      console.log("get movies finished");

      await this.getUserProfile();
      console.log("get user finished");

      // Once both async functions are completed, set loading to false
      this.loading = false;
    } catch (error) {
      // Handle any errors that might occur during async operations
      console.error('Error occurred:', error);
      // Optionally, you can also set loading to false in case of error
    }
  }

  /**
 * Toggles the delete account button state and starts or stops the cooldown timer.
 */
  deleteBtnTimer() {
    this.deleteAccount = !this.deleteAccount

    if (this.deleteAccount === false) {
      clearInterval(this.cooldown)
    }

    if (this.deleteAccount === true) {
      this.timer = 5

      this.cooldown = setInterval(() => {
        console.log(isNaN(this.timer));

        if (this.timer <= 1) {
          clearInterval(this.cooldown);
          this.timer = "YES!! (┛✧Д✧))┛彡┻━┻"
        } else {
          this.timer -= 1;
        }
      }, 1000);
    }

  }

  /**
 * Returns the error message for the username input field.
 * @returns Error message for invalid username.
 */
  getUserErrorMessage() {
    return 'Username must be at least 3 characters';
  }

  /**
   * Returns the error message for the email input field.
   * @returns Error message for invalid email.
   */
  getEmailErrorMessage() {
    if (this.emailForm.hasError('required')) {
      return 'Email is required';
    }

    return this.emailForm.hasError('email') ? 'Not a valid email' : '';
  }

  /**
 * Returns the error message for the birthday input field.
 * @returns Error message for invalid birthday.
 */
  getBirthdayErrorMessage() {
    if (this.birthdayForm.hasError('matDatepickerMin') || this.birthdayForm.hasError('matDatepickerMax')) {
      return 'Your date is out of range'
    }

    if (this.birthdayForm.hasError('matDatepickerParse')) {
      return 'Please enter a valid date'
    }

    return this.emailForm.hasError('required') ? 'Please enter a date' : '';
  }

  /**
 * Retrieves all movies from the API.
 * @returns A Promise that resolves when movies are successfully retrieved.
 */
  getMovies() {
    return new Promise<void>((resolve, reject) => {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        resolve()
      });
    })
  }

  /**
 * Opens a dialog to display the genres of a movie.
 * @param movie - The movie object to display the genres for.
 */
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '450px',
      data: {
        movies: this.movies,
        movie: movie
      }
    });
  }

  /**
 * Opens a dialog to display the director of a movie.
 * @param movie - The movie object to display the director for.
 */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '450px',
      data: {
        movies: this.movies,
        movie: movie
      }
    });
  }

  /**
 * Retrieves the user profile data from the API.
 * @returns A Promise that resolves when the user profile data is successfully retrieved.
 */
  getUserProfile() {
    return new Promise<void>((resolve, reject) => {
      this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
        this.user = resp
        console.log(this.user);
        console.log(this.movies);

        if (this.movies) {
          this.favMovies = this.movies.filter((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie.id)) {
              console.log("yep")
              return movie
            }
          })
        }

        resolve()

      });
    })
  }

  /**
 * Updates the username of the user.
 */
  updateUsername() {
    let data = { Username: this.newUsername }

    this.fetchApiData.editUser(data).subscribe((resp: any) => {
      // updating the username in localstorage
      localStorage.setItem("user", this.newUsername)

      // trigger a component reload by navigating to the same route
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profile']);
      });

      this.snackBar.open("Username successfully updated", 'OK', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });

      console.log("new username response:", resp);
    })
  }

  /**
 * Updates the password of the user.
 */
  updatePassword() {
    let data = { Password: this.newPassword }

    this.fetchApiData.editUser(data).subscribe((resp: any) => {
      // trigger a component reload by navigating to the same route
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profile']);
      });

      this.snackBar.open("Password successfully updated", 'OK', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });

      console.log("new username response:", resp);
    })
  }

  /**
 * Updates the email of the user.
 */
  updateEmail() {
    // accessing the email input value directly using reactive forms
    let data = { Email: this.emailForm.value }

    this.fetchApiData.editUser(data).subscribe((resp: any) => {

      // trigger a component reload by navigating to the same route
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profile']);
      });

      this.snackBar.open("Email successfully updated", 'OK', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });

      console.log("new email response:", resp);
    })
  }

  /**
 * Updates the birthday of the user.
 */
  updateBirthday() {
    // accessing the email input value directly using reactive forms
    console.log(this.birthdayForm.value);

    let birthday = new Date(this.birthdayForm.value! as string).toISOString().split('T', 1)[0]

    let data = { Birthday: birthday }

    this.fetchApiData.editUser(data).subscribe((resp: any) => {

      // trigger a component reload by navigating to the same route
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profile']);
      });

      this.snackBar.open("Birthday successfully updated", 'OK', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });

      console.log("new birthday response:", resp);
    })
  }

  /**
 * Deletes the user account.
 * @param user - The user object representing the account to be deleted.
 */
  deleteUserAccount(user: any) {
    this.fetchApiData.deleteUser(user).subscribe((resp: any) => {

      if (typeof window !== 'undefined') {
        localStorage.removeItem("user");
        localStorage.removeItem("token")
      }

      //navigate to welcome screen after deleting account
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
      // });

      this.snackBar.open("Account successfully deleted", 'OK', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });

      console.log("acc del response:", resp);
    })
  }

  /**
 * Opens a dialog to display movie details.
 * @param movie - The movie object to display details for.
 */
  openMovieDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      width: '450px',
      data: {
        movie: movie
      }
    });
  }

  /**
 * Checks if a movie is favorited by the user.
 * @param movie - The movie object to check for favorited status.
 * @returns True if the movie is favorited, otherwise false.
 */
  isFavorited(movie: any) {
    if (this.user.FavoriteMovies.includes(movie.id)) {
      // console.log("yep")
      return true
    } else return false
  }

  /**
 * Toggles the favorite status of a movie.
 * @param movie - The movie object to toggle the favorite status for.
 */
  toggleFavorite(movie: any) {
    if (this.user.FavoriteMovies.includes(movie.id)) {
      console.log("removing from favs")
      this.fetchApiData.deleteFavoriteMovie(movie).subscribe((resp: any) => {
        console.log(resp);

        // trigger a component reload by navigating to the samem route
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['profile']);
        });

        this.snackBar.open(`${movie.title} was removed from favorites.\nYou can view your favorites from your profile.`, 'OK', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      })
    } else {
      console.log("adding to favs");
      this.fetchApiData.addFavoriteMovie(movie).subscribe((resp: any) => {
        console.log(resp);

        // trigger a component reload by navigating to the samem route
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['profile']);
        });

        this.snackBar.open(`${movie.title} was added to favorites.\nYou can view your favorites from your profile.`, 'OK', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      })
    }
  }

}
