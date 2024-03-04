import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

export const routes: Routes = [

    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: 'profile', component: ProfileViewComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },

];
