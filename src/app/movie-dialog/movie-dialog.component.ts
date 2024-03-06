import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

/**
 * Component representing a dialog for displaying movie information.
 */
@Component({
  /**
   * Selector used to identify this component in HTML templates.
   */
  selector: 'app-movie-dialog',
  /**
   * Indicates that this component is standalone and does not rely on external templates or stylesheets.
   */
  standalone: true,
  /**
   * External modules imported by this component.
   */
  imports: [MatCard, MatCardContent, MatDialogContent, MatCardTitle, MatCardSubtitle, MatButton, MatButtonModule],
  /**
   * Relative path to the HTML template file for this component.
   */
  templateUrl: './movie-dialog.component.html',
  /**
   * Relative path to the stylesheet file(s) for this component.
   */
  styleUrls: ['./movie-dialog.component.scss']
})
export class MovieDialogComponent {

  /**
   * Constructor for MovieDialogComponent.
   * @param data - Data injected into the dialog.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}