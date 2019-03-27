import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userboard',
  templateUrl: './userboard.component.html',
  styleUrls: ['./userboard.component.css']
})
export class UserboardComponent implements OnInit {

  details: UserDetails;
  allBooks: any;
  allBooksProg: any;
  allBooksArr: any;
  u: any;
  showPop:boolean = false;
  searchBoxClicked:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.auth.getAllBooks().subscribe(books => {
        this.details = user;
        this.allBooksProg = books;
      });
    });
  }

  searchForBooksFocusIn()
  {
      this.searchBoxClicked = true;
  }

  searchForBooksFocusOut()
  {
      this.searchBoxClicked = false;
  }

  openBook(id)
  {
    console.log(id);
    this.router.navigate(['/home/bookDetails',id]);
  }
}
