import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Component representing a dialog for displaying genre information.
 */
@Component({
  /**
   * Selector used to identify this component in HTML templates.
   */
  selector: 'app-genre-dialog',
  /**
   * Indicates that this component is standalone and does not rely on external templates or stylesheets.
   */
  standalone: true,
  /**
   * External modules imported by this component.
   */
  imports: [MatCard, MatCardContent, MatDialogContent, MatDividerModule, CommonModule],
  /**
   * Relative path to the HTML template file for this component.
   */
  templateUrl: './genre-dialog.component.html',
  /**
   * Relative path to the stylesheet file(s) for this component.
   */
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit {

  /**
   * Constructor for GenreDialogComponent.
   * @param data - Data injected into the dialog.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Object representing the genre.
   */
  genre: any;

  /**
   * Array of titles of movies belonging to the genre.
   */
  genreMovies: any;

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Retrieves genre information and movies belonging to the genre from injected data.
   */
  ngOnInit(): void {
    this.genre = this.data.movie.genre.Name;

    this.genreMovies = this.data.movies
      .filter((movie: any) => movie.genre.Name === this.data.movie.genre.Name)
      .map((movie: any) => movie.title);

    console.log(this.genreMovies);
  }

}