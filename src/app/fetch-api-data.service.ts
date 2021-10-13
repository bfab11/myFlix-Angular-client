import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const apiUrl = 'https://myflixdbapp.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

    /**
     * Making the api call for the user registration endpoint
    * @param userData  Provided from API, Username, Password, Email, Birthday, Favorites.
    */
    public userRegistration(userData: any): Observable<any> {
      console.log(userData);
      return this.http.post(apiUrl + 'users', userData).pipe(
        catchError(this.handleError)
      );
    }

    /**
    * Returns endpoint for user login.
    */
    public userLogin(userData: any): Observable<any> {
      console.log(userData);
      return this.http.post(apiUrl + 'login', userData).pipe(
        catchError(this.handleError)
      );
    }

    private handleError(error: HttpErrorResponse): any {
      if(error.error instanceof ErrorEvent) {
        console.error('Some error occured: ', error.error.message);
      } else {
        console.error(
          `Error Status code ${error.status},` + 
          `Error body is: ${error.error}`
        );
      }
      return throwError(
        'Something bad happened; please try again later'
      );
    }

    /**
    * Fetch all movies
    * @returns All movies.
    */
    getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      console.log(token, 'user token');
      return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          tap(() => console.log('getAllMovies')),
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
    * get Single movie details
    */
    getMovie(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
    * Find details for the director of selected movie
    */
    getDirector(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/directors/:Name', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
    * Find genre details of movie
    */
    getGenre(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/genres/:Name', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
    * Fetch single user details
    * @param username Username is required.
    * @returns User details
    */
    getUser(username: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
    * Update user details
    * @param userData Fetched from input forn, exludes Username. If included will return 500 error
    * @param user Username required
    * @returns Updates users details
    */
    editUser(userData: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.put(apiUrl + `users/${username}`, userData, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
    * Delete user profile
    * Username required.
    */
    deleteUser(user: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
     * Request for user's favorite movies list
     * @param username Username required
     * @returns favorites list
    */
    getFavorites(): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.get(apiUrl + `users/${username}/favorites`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
     * Add movie to User Favorites list
     * @param username Username required
     * @param id Movie id required
     * @returns will add to users favorites list
    */
    addToFavorites(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      console.log('TESTING');
      return this.http.post(apiUrl + `users/${username}/favorites/${id}`, id, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
     * Remove movie from users Favorites list
     * @param username Username required
     * @param id Movie id required
    */
    removeFromFavorites(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.delete(apiUrl + `users/${username}/favorites/${id}`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    //non-typed response extraction
    private extractResponseData(res: Response | Object): any {
      const body = res;
      console.log(body, 'extractResponseData');
      return body || { };
    }
}