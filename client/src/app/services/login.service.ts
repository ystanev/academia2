import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
/*
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
*/
  constructor(private http: HttpClient) { }

  /*public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
*/
  validateLogin(user: User){
    return this.http.post('/login', {
      email: user.email,
      password: user.password
    });

    //this.currentUserSubject.next(user);
  }
/*
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }*/
}
