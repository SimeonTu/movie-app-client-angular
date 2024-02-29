import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map, mergeMap, forkJoin, EMPTY } from 'rxjs';
import { log } from 'console';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class IFDbAPIservice {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // get all movies from IFDb api and then attach image URLs to each movie object from TFDb
  getAllMovies(): Observable<any> {
    // only execute when in browser, otherwise we get localStorage is not defined error, as localStorage is not a thing on the backend
    if (typeof window !== 'undefined') {

    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      mergeMap((movies: any) => {
        console.log(movies);

        let mappedMovies = movies.map((movie: any) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director,
            releaseYear: movie.ReleaseYear,
            rating: movie.Rating,
            featured: movie.Featured,
          };
        })

        const TFDBoptions = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTI4MTNmMzRhNWFiYzdjYmU0YjE1NzZkMGIyYmY1MSIsInN1YiI6IjY1OGYzZmUwZDUxOTFmNmExZDI3MDcwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ybplmx9CH6yhdA36BEjUrppLyGMMPtjLxPy1cU-Z_c4'
          }
        };

        let requests = mappedMovies.map((movie: any) => {
          return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${movie.title}&language=en-US&page=1`, TFDBoptions)
        })

        console.log(requests);


        return forkJoin(requests).pipe(
          map((responses: any[]) => {
            console.log(responses);
            // return responses
            return mappedMovies.map((mappedMovie: any, index: number) => {
              return {
                ...mappedMovie,
                image: responses[index].results.length > 0 ? `http://image.tmdb.org/t/p/w500${responses[index].results[0].poster_path}` : null
              };
            });
          }) as any
        )

      })
    )
    } else return EMPTY //return empty observable if code is not run in browser
  }

  private extractResponseData(res: any): any {
    const body = res
    return body || {}
  }

  getOneMovie(title: string): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return this.http.get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    //checking if code is running in the browser to avoid getting "localStorage is not defined"
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    return user;
  }

  getFavouriteMovies(username: string): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavouriteMovies(movie: any): Observable<any> {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return this.http.put(apiUrl + 'users/' + userDetails.Username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<any> {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteFavouriteMovies(movie: any): Observable<any> {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('in fetch api service: ', movie._id);
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}