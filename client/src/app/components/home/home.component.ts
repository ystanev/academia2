import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  details: UserDetails;
  showUserboard:boolean = true;
  showAccount:boolean = false;
  showPayment:boolean = false;
  showUpload:boolean = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

  }

  toggleUserboard()
  {
    this.showUserboard = true;
    this.showAccount = false;
    this.showPayment = false;
    this.showUpload = false;
  }
 
  toggleAccount()
  {
    this.showUserboard = false;
    this.showAccount = true;
    this.showPayment = false;
    this.showUpload = false;
  }
  togglePayment()
  {
    this.showUserboard = false;
    this.showAccount = false;
    this.showPayment = true;
    this.showUpload = false;
  }
  toggleUpload()
  {
    this.showUserboard = false;
    this.showAccount = false;
    this.showPayment = false;
    this.showUpload = true;
  }
}
