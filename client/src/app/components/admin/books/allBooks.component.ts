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
  allBooks:any;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(){
    this.auth.getAllBooks().subscribe(books => {
      this.allBooks = books;
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
