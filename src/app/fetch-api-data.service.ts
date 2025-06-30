import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
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
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public getMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }
  
  public getDirector(name: string): Observable<any> {
    return this.http.get(apiUrl + `director/${name}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public getGenre(name: string): Observable<any> {
    return this.http.get(apiUrl + `genre/${name}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public getFavoriteMovies(name: string): Observable<any> {
    return this.http.get(apiUrl + `users/${name}/favoriteMovies`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public getUser(name: string): Observable<any> {
    return this.http.get(apiUrl + `users/${name}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public addFavoriteMovie(name: string, movieId: string): Observable<any> {
    return this.http.post(apiUrl + `users/${name}/favoriteMovies/${movieId}`, {}).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public editUser(name: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `users/${name}`, userDetails).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public deleteFavoriteMovie(name: string, movieId: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${name}/favoriteMovies/${movieId}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public deleteUser(name: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${name}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public removeFavoriteMovie(name: string, movieId: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${name}/favoriteMovies/${movieId}`).  pipe(
      map(response => response),
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
    return throwError(
    'Something bad happened; please try again later.');
  }
}