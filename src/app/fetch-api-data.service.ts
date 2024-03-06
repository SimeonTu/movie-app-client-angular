import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map, mergeMap, forkJoin, EMPTY } from 'rxjs';
import { log } from 'console';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/';

/**
 * Service for interfacing with the IFDb API to handle user authentication and movie data retrieval.
 */
@Injectable({
  providedIn: 'root'
})
export class IFDbAPIservice {

  /**
   * Initializes the service with HttpClient for HTTP requests.
   * @param http - Angular HttpClient module for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Makes a POST request to register a new user.
   * @param userDetails - Details of the user to be registered.
   * @returns Observable that resolves to the response from the API.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes a POST request to authenticate a user.
   * @param userDetails - Details of the user to be authenticated.
   * @returns Observable that resolves to the response from the API.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all movies from the IFDb API and attaches image URLs to each movie object.
   * @returns Observable that resolves to an array of movies with image URLs.
   */
  getAllMovies(): Observable<any> {
    // only execute when in browser, otherwise we get localStorage is not defined error, as localStorage is not a thing on the backend
    if (typeof window !== 'undefined') {

      const token = localStorage.getItem('token')
      return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: "Bearer " + token,
          })
      }).pipe(
        mergeMap((movies: any) => {
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

          return forkJoin(requests).pipe(
            map((responses: any[]) => {
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

  /**
   * Retrieves a single movie by its title.
   * @param title - Title of the movie to retrieve.
   * @returns Observable that resolves to the response from the API.
   */
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

  /**
   * Retrieves movies by genre.
   * @returns Observable that resolves to the response from the API.
   */
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

  /**
   * Retrieves user information, including favorite movies.
   * @param username - Username of the user to retrieve information for.
   * @returns Observable that resolves to the response from the API.
   */
  getUser(username: string): Observable<any> {
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

  /**
   * Adds a movie to the user's favorites.
   * @param movie - Movie object to add to favorites.
   * @returns Observable that resolves to the response from the API.
   */
  addFavoriteMovie(movie: any): Observable<any> {
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log("user:", user);
    console.log("token:", token);
    console.log('in fetch api movie: ', movie);
    console.log('in fetch api movie id: ', movie.id);
    let fullurl = "https://ifdbase-c6a1086fce3e.herokuapp.com/" + 'users/' + user + '/movies/' + movie.id
    console.log(fullurl);

    return this.http.post(fullurl, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a movie from the user's favorites.
   * @param movie - Movie object to remove from favorites.
   * @returns Observable that resolves to the response from the API.
   */
  deleteFavoriteMovie(movie: any): Observable<any> {
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log("user:", user);
    console.log("token:", token);
    console.log('in fetch api movie: ', movie);
    console.log('in fetch api movie id: ', movie.id);
    let fullurl = apiUrl + 'users/' + user + '/movies/' + movie.id
    console.log(fullurl);

    return this.http.delete(fullurl, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edits user information.
   * @param data - Updated user data.
   * @returns Observable that resolves to the response from the API.
   */
  editUser(data: any): Observable<any> {
    console.log(data);
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return this.http.put(apiUrl + 'users/' + user, data, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user.
   * @param user - User object to be deleted.
   * @returns Observable that resolves to the response from the API.
   */
  deleteUser(user: any): Observable<any> {
    // const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
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

  /**
   * Extracts response data from the HTTP response.
   * @param res - HTTP response object.
   * @returns Extracted response data.
   */
  private extractResponseData(res: any): any {
    const body = res
    return body || {}
  }

  /**
   * Handles errors occurred during HTTP requests.
   * @param error - HTTP error response object.
   * @returns Observable that emits an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        error,
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}