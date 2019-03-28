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
  allBooksArr: any;
  u: any;
  showPop:boolean = false;
  searchBoxClicked:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.auth.getAllBooks().subscribe(books => {
        this.details = user;
        this.allBooks = books;
        //this.allBooksArr = [];
        //console.log(books);
        /*for(this.u of this.allBooks){
          this.allBooksArr.push(this.allBooks[this.u]);
        }*/
        //console.log(this.allBooks);
        
      }, (err) => {
        console.error(err);
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
    this.router.navigate(['/home/book-view',id]);
  }
}
