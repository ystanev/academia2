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
      //debugger
      /*var i;
      console.log(users);
      for(i = 0; i < users.length;i++){
        this.details = users[i];
      }*/
      
      this.allUsrs = users;
      this.allUsersArr = [];
      console.log(users);
      for(this.u of this.allUsrs){
        this.allUsersArr.push(this.allUsrs[this.u]);
      }
      console.log(this.allUsrs);
      
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
