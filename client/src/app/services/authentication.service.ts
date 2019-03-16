import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  program: string;
  roles: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  fname?: string;
  lname?: string;
  program?: string;
  roles?:string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get'|'delete', type: 'login'|'register'|'profile'|'user'|'books'|'upload', user?: TokenPayload, id?: String): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else if (method === 'get'){
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'delete'){
      base = this.http.delete(`/api/${type}/${id}`);
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public getAllUsers(): Observable<any> {
    return this.request('get', 'user');
  }

  public addBook(book, filePath): Observable<any> {
    //return this.request('post', 'upload', book);
    return this.http.post('/api/books', filePath + book).pipe(catchError(this.handleError));
  }

  public uploadFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileName', fileToUpload, fileToUpload.name);
    return this.http.post('/api/upload', formData,
     { headers: { 'enctype': 'multipart/form-data' }}).pipe(catchError(this.handleError));
  }

  public getAllBooks(): Observable<any> {
    return this.request('get','books');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
