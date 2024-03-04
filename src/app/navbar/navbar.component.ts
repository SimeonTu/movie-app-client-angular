import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

// import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
// import { MovieCardComponent } from '../movie-card/movie-card.component';
// import { ProfileViewComponent } from '../profile-view/profile-view.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon, MatToolbarModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  navigateHome() {
    this.router.navigate(["movies"])
  }

  navigateProfile() {
    this.router.navigate(["profile"])
  }

  // function for logging out of the site
  logOut() {
    // navigating to welcome screen
    this.router.navigate(["welcome"])
    // removing stored user and token data from storage
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

}
