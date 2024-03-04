import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IFDbAPIservice } from '../fetch-api-data.service'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    MatCard,
    MatDialogContent,
    MatCardTitle,
    MatCardSubtitle,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    MatGridListModule,
    MatFormField,
    MatInputModule,
    FormsModule
  ],
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any = [];
  filteredMov: any = [];

  currentRange?: string;
  username: any = localStorage.getItem('user');
  user: any;
  loading: boolean = true;
  favDisabled: boolean = false;

  @Input() value: any;

  constructor(
    public fetchApiData: IFDbAPIservice,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public snackBar: MatSnackBar
  ) { };

  async ngOnInit() {
    console.log("loaded");

    // observe for different screen sizes to make the app responsive
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(() => {

        if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
          this.currentRange = '1';
          console.log("screen size:", Breakpoints.XSmall);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
          this.currentRange = '3';
          console.log("screen size:", Breakpoints.Small);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
          this.currentRange = '4';
          console.log("screen size:", Breakpoints.Medium);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
          this.currentRange = '5';
          console.log("screen size:", Breakpoints.Large);
        }
        if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
          this.currentRange = '6';
          console.log("screen size:", Breakpoints.XLarge);
        }
      });

    try {

      // Wait for both async functions to complete using await
      await Promise.all([this.getMovies(), this.getUser()]);
      // Once both async functions are completed, set loading to false
      this.loading = false;

    } catch (error) {
      // Handle any errors that might occur during async operations
      console.error('Error occurred:', error);
      // Optionally, you can also set loading to false in case of error
    }
  }

  inputChanged(event: any) {
    console.log(event)
    console.log(this.movies);


    if (event) {
      this.filteredMov = this.movies.filter((movie: any) => {
        if (movie.title.trim().toLowerCase().includes(event.trim().toLowerCase())) {
          console.log("movie matched")
          return movie
        }
      })

      if (this.filteredMov.length === 0) {
        this.filteredMov = { error: "no movies found" }
      }
    } else this.filteredMov = {}



    // if (this.filteredMov.length != 0) {
    //   console.log("yep", this.filteredMov);
    //   GlobalConstants.filteredMovies = this.filteredMov
    // } else {
    //   console.log("no movies found");
    //   GlobalConstants.filteredMovies = {}
    // }

    console.log("\n\nfilteredMovies value:", this.filteredMov, "\n\ntype of filmov:", typeof this.filteredMov);

  }

  getMovies() {
    return new Promise<void>((resolve, reject) => {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log("movies obj:", this.movies);
        resolve()
      });
    })
  }

  getUser() {
    return new Promise<void>((resolve, reject) => {
      this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
        this.user = resp
        console.log("user obj:", this.user);

        resolve()
      })
    })
  }

  openMovieDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      width: '400px',
      data: {
        movie: movie
      }
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '450px',
      data: {
        movies: this.movies,
        movie: movie
      }
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '450px',
      data: {
        movies: this.movies,
        movie: movie
      }
    });
  }

  isFavorited(movie: any) {
    if (this.user) {
      if (this.user.FavoriteMovies.includes(movie.id)) {
        // console.log("yep")
        return true
      } else return false
    } else return false
  }

  toggleFavorite(movie: any) {
    if (this.user.FavoriteMovies.includes(movie.id)) {
      console.log("removing from favs")

      // temporarily disabling favorites button while fetching API
      this.favDisabled = true

      this.fetchApiData.deleteFavoriteMovie(movie).subscribe((resp: any) => {
        console.log(resp);

        this.favDisabled = false

        // trigger a component reload by navigating to the samem route
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['movies']);
        });

        this.snackBar.open(`${movie.title} was removed from favorites.\nYou can view your favorites from your profile.`, 'OK', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      })
    } else {
      console.log("adding to favs");

      // temporarily disabling favorites button while fetching API
      this.favDisabled = true

      this.fetchApiData.addFavoriteMovie(movie).subscribe((resp: any) => {
        console.log(resp);

        this.favDisabled = false

        // trigger a component reload by navigating to the samem route
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['movies']);
        });

        this.snackBar.open(`${movie.title} was added to favorites.\nYou can view your favorites from your profile.`, 'OK', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      })
    }
  }

}