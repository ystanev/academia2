import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    fname: '',
    lname: '',  
    password: '',
    program: '',
    roles: 'normalUser'
  };
  /*
  public user: User;

  constructor( private registerService:RegisterService, private router:Router) {
    this.user = new User();
  }
  */
  
  constructor(private auth: AuthenticationService, private router: Router) {}
  
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home');
      return false;
    }else {
      
    }
  }
  
  /*
  registerUser(){
    this.registerService.registerUser(this.user).subscribe(result => {
      console.log('result is ', result);
      if(result['status'] === 'success') {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login']);
      }
    }, error => {
      console.log('error is ', error);
    });
  }
  */
  
  registerUser() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    });
  }

}
