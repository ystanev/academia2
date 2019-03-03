import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';

@Component({
  selector: 'app-adminAllUsers',
  templateUrl: './allUsers.component.html',
  styleUrls: ['./allUsers.component.css']
})
export class AllUsersComponent implements OnInit {

  details: UserDetails;
  showUser:boolean = true;
  showDashboard:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  toggleDashboard()
  {
    this.showUser = false;
    this.showDashboard = true;
  }

}
