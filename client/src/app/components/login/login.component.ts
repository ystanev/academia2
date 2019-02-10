import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  /*
  public user: User;

  constructor( private loginService: LoginService, private router: Router) { 
    this.user = new User();
  }
  */
  
  constructor(private auth: AuthenticationService, private router: Router) {}


  ngOnInit() {
  }

/*
  validateLogin(){
    if(this.user.email && this.user.password) {
  		this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result['status'] === 'success') {
          this.router.navigate(['/home']);
        } else {
          alert('Wrong username password');
        }
        
      }, error => {
        console.log('error is ', error);
      });
  	} else {
      alert('enter email and password');
    }
  }
  */
  
  validateLogin() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    }); 
  }
  
}
