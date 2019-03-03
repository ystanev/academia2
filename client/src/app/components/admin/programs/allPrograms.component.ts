import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';

@Component({
  selector: 'app-adminAllPrograms',
  templateUrl: './allPrograms.component.html',
  styleUrls: ['./allPrograms.component.css']
})
export class AllProgramsComponent implements OnInit {

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
