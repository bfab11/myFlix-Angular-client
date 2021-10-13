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
    // Making the api call for the user registration endpoint
    public userRegistration(userData: any): Observable<any> {
      console.log(userData);
      return this.http.post(apiUrl + 'users', userData).pipe(
        catchError(this.handleError)
      );
    }

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

    //get all movies
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

    //get movie
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

    //get director
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

    //get genre of movie
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

    //get user by username
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

    //edit user by username
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

     //delete user
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

    //get favorites
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

    //add movie to favorites
    addToFavorites(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.post(apiUrl + `users/${username}/favorites/${id}`, id, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    //remove from favorites
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