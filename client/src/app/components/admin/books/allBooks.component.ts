import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';

@Component({
  selector: 'app-adminAllBooks',
  templateUrl: './allBooks.component.html',
  styleUrls: ['./allBooks.component.css']
})
export class AllBooksComponent implements OnInit {

  allBooks: any;
  allBooksArr: any;
  u: any;
  details: UserDetails;
  showUser:boolean = true;
  showDashboard:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.getAllBooks().subscribe(books => {
      
      this.allBooks = books;
      this.allBooksArr = [];
      console.log(books);
      for(this.u of this.allBooks){
        this.allBooksArr.push(this.allBooks[this.u]);
      }
      //console.log(this.allBooks);
      
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
