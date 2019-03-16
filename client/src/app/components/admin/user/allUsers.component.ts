import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminAllUsers',
  templateUrl: './allUsers.component.html',
  styleUrls: ['./allUsers.component.css']
})
export class AllUsersComponent implements OnInit {

  allUsers: any;
  details: UserDetails;
  showUser:boolean = true;
  showDashboard:boolean = false;
  allUsersArr = [];
  allUsrs:any;
  u:any;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.getAllUsers().subscribe(users => {
      this.allUsrs = users;
      this.allUsersArr = [];
      for(this.u of this.allUsrs){
        this.allUsersArr.push(this.allUsrs[this.u]);
      }
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
