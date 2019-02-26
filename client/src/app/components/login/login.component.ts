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

    if (this.auth.isLoggedIn()) {
      if(this.credentials.email === 'admin'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/home']);
      }
      return true;
    }
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
    if(this.credentials.email && this.credentials.password){
      this.auth.login(this.credentials).subscribe(result => {
        console.log('result is ', result);
        if(this.credentials.email === 'admin'){
          this.router.navigate(['/admin']);
        }else {
          this.router.navigate(['/home']);
        }
        /*if(result['status'] === 'success') {
         
        }else {
          alert('Wrong username or password ');
        }*/
        
      }, (err) => {
        console.error(err);
      }); 
    } else {
      alert('enter email and password');
    }
    
  };
  
}
