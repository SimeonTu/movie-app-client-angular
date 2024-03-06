import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Root component of the Angular application.
 * Responsible for rendering the main application layout.
 */
@Component({
  /**
   * Indicates that this component is standalone and does not rely on external templates or stylesheets.
   */
  standalone: true,
  /**
   * List of external modules imported by this component.
   */
  imports: [RouterModule],
  /**
   * Selector that identifies this component when used in HTML templates.
   */
  selector: 'app-root',
  /**
   * Relative path to the HTML template file for this component.
   */
  templateUrl: './app.component.html',
  /**
   * Array of relative paths to stylesheet files for this component.
   */
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Title of the application.
   */
  title = 'myFlix-Angular-client';
}
