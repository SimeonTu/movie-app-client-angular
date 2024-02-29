import { Component, OnInit } from '@angular/core';
import { IFDbAPIservice } from '../fetch-api-data.service'
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatCard, MatDialogContent, MatCardTitle, MatCardSubtitle, CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];

  constructor(public fetchApiData: IFDbAPIservice) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}