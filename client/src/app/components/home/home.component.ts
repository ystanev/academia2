import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  details: UserDetails;
  showDashboard:boolean = true;
  showAccount:boolean = false;
  showPayment:boolean = false;
  showUpload:boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home/userboard');
    }else {
      this.router.navigateByUrl('/login');
    }

  }

  toggleUserboard()
  {
    this.showDashboard = true;
    this.showAccount = false;
    this.showPayment = false;
    this.showUpload = false;
  }
 
  toggleAccount()
  {
    this.showDashboard = false;
    this.showAccount = true;
    this.showPayment = false;
    this.showUpload = false;
  }
  togglePayment()
  {
    this.showDashboard = false;
    this.showAccount = false;
    this.showPayment = true;
    this.showUpload = false;
  }
  toggleUpload()
  {
    this.showDashboard = false;
    this.showAccount = false;
    this.showPayment = false;
    this.showUpload = true;
  }
}
