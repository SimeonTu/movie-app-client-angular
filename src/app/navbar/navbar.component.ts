import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

/**
 * Component representing the navigation bar.
 */
@Component({
  /**
   * Selector used to identify this component in HTML templates.
   */
  selector: 'app-navbar',
  /**
   * Indicates that this component is standalone and does not rely on external templates or stylesheets.
   */
  standalone: true,
  /**
   * External modules imported by this component.
   */
  imports: [MatIcon, MatToolbarModule, MatButtonModule, MatMenuModule],
  /**
   * Relative path to the HTML template file for this component.
   */
  templateUrl: './navbar.component.html',
  /**
   * Relative path to the stylesheet file(s) for this component.
   */
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  /**
   * Constructor for NavbarComponent.
   * @param router - Router service used for navigation.
   */
  constructor(private router: Router) { }

  /**
   * Navigate to the home page.
   */
  navigateHome() {
    this.router.navigate(["movies"]);
  }

  /**
   * Navigate to the user profile page.
   */
  navigateProfile() {
    this.router.navigate(["profile"]);
  }

  /**
   * Logs out the user.
   * Navigates to the welcome screen and removes stored user and token data from storage.
   */
  logOut() {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

}