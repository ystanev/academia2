import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    
  }

}
