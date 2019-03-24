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
    //roles: 'normalUser'
  };
  
  allProgs:any;
  progValSel:any;

  /*
  public user: User;

  constructor( private registerService:RegisterService, private router:Router) {
    this.user = new User();
  }
  */
  
  constructor(private auth: AuthenticationService, private router: Router) {}
  
  ngOnInit() {
    /*if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home');
      return false;
    }else {
      
    }*/
    this.getAllPrograms();
  }

  getAllPrograms(){
    this.auth.getAllPrograms().subscribe(programs => {
      this.allProgs = programs;
    }, (err) => {
      console.error(err);
    });

  }

  // getSelectProgValue(progVal){
  //   this.progValSel = progVal;
  //   console.log('program is ----->'+this.progValSel);
  // }

  onChange(event){
    this.credentials.program =  event.target.value;
    console.log(this.credentials);
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
    //debugger
    this.auth.register(this.credentials).subscribe(() => {
      console.log(this.credentials);
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    });
  }

}
