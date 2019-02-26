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
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/admin');
      return true;
    }else {
      this.router.navigateByUrl('/login');
    }

  }

}
