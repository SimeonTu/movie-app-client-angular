import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

/**
 * Defines the routes for the application.
 */
export const routes: Routes = [
    /** Route for displaying the welcome page. */
    { path: 'welcome', component: WelcomePageComponent },
    /** Route for displaying the movie card component. */
    { path: 'movies', component: MovieCardComponent },
    /** Route for displaying the user profile view. */
    { path: 'profile', component: ProfileViewComponent },
    /** Default route redirects to the welcome page. */
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
