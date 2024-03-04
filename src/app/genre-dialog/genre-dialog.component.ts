import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [MatCard, MatCardContent, MatDialogContent, MatDividerModule, CommonModule],
  templateUrl: './genre-dialog.component.html',
  styleUrl: './genre-dialog.component.scss'
})

export class GenreDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  genre: any;
  genreMovies: any;

  ngOnInit(): void {
    // console.log(this.data);

    this.genre = this.data.movie.genre.Name
    
    this.genreMovies = this.data.movies.filter((movie: any) => movie.genre.Name === this.data.movie.genre.Name).map((movie: any) => movie.title)
    console.log(this.genreMovies);
    
  }

}
