import { Component, Inject, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [MatCard, MatCardContent, MatDialogContent, MatCardTitle, MatCardSubtitle, MatButton, MatButtonModule],
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.scss'
})

export class MovieDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // console.log(this.data);

  }

}
