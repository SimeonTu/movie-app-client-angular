import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [MatCard, MatCardContent, MatDialogContent, MatDividerModule, CommonModule],
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.scss'
})

export class DirectorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  director: any;
  // genreMovies: any;

  ngOnInit(): void {
    // console.log(this.data);

    this.director = this.data.movie.director.Name

    // this.genreMovies = this.data.movies.filter((movie: any) => movie.genre.Name === this.data.movie.genre.Name).map((movie: any) => movie.title)
    // console.log(this.genreMovies);

  }

}
