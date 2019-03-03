import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';

@Component({
  selector: 'app-adminAllBooks',
  templateUrl: './allBooks.component.html',
  styleUrls: ['./allBooks.component.css']
})
export class AllBooksComponent implements OnInit {

  details: UserDetails;
  showUser:boolean = true;
  showDashboard:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  toggleDashboard()
  {
    this.showUser = false;
    this.showDashboard = true;
  }

}
