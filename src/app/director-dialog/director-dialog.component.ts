import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Component representing a dialog for displaying director information.
 */
@Component({
  /**
   * Selector used to identify this component in HTML templates.
   */
  selector: 'app-director-dialog',
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
  templateUrl: './director-dialog.component.html',
  /**
   * Relative path to the stylesheet file(s) for this component.
   */
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent implements OnInit {
  /**
   * Constructor for DirectorDialogComponent.
   * @param data - Data injected into the dialog.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Object representing the director.
   */
  director: any;

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Retrieves director information from injected data.
   */
  ngOnInit(): void {
    this.director = this.data.movie.director.Name;
  }
}
