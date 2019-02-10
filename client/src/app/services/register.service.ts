import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(user: User){
    return this.http.post('/register', {
      fname: user.fname,
      lname: user.lname,
	  email: user.email,
      password: user.password,
      program: user.program
    })
  }
}
