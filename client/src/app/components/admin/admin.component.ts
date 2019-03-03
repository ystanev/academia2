import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  details: UserDetails;
  showUser:boolean = false;
  showDashboard:boolean = true;
  showBooks:boolean = false;
  showPrograms:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/admin/dashboard');
      return true;
    }else {
      this.router.navigateByUrl('/login');
    }

  }

  toggleUser()
  {
    this.showUser = true;
    this.showDashboard = false;
    this.showBooks = false;
    this.showPrograms = false;
  }
  toggleDashboard()
  {
    this.showUser = false;
    this.showDashboard = true;
    this.showBooks = false;
    this.showPrograms = false;
  }
  toggleBooks()
  {
    this.showUser = false;
    this.showDashboard = false;
    this.showPrograms = false;
    this.showBooks = true;
  }
  togglePrograms()
  {
    this.showUser = false;
    this.showDashboard = false;
    this.showPrograms = true;
    this.showBooks = false;
  }

}
