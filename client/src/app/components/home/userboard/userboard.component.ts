import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-userboard',
  templateUrl: './userboard.component.html',
  styleUrls: ['./userboard.component.css']
})
export class UserboardComponent implements OnInit {

  searchText: any;

  details: UserDetails;
  allBooks: any;
  subBooks: any;
  allBooksArr: any;
  u: any;
  showPop:boolean = false;
  searchBoxClicked:boolean = false;
  booksAvailable:boolean = false;
  booksAvailableMsg:boolean = false;
  
  constructor
  (private auth: AuthenticationService, private router: Router) { }

  ngOnInit(){
    this.auth.profile().subscribe(user => {
      this.showSubscribed(user._id);
      this.details = user;
      this.auth.getAllBooks().subscribe(books => {
        this.auth.getBooksByProgram(user.program._id).subscribe(bbprog => {
          for(let i = 0; i < bbprog.length; i++)
          {
            this.allBooks = bbprog;
            if(user.program._id == bbprog[i].program)
            {
              this.booksAvailable = true;
              this.booksAvailableMsg = false;
            }
            else{
              this.booksAvailable = false;
              this.booksAvailableMsg = true;
            }
          }
        });
      });
    });
  }

  showSubscribed(id){
      this.auth.getASubscription(id).subscribe(subs => {
        this.subBooks = subs.bookRef;
      }, (err) => {
        console.error(err);
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

  openSubBook(id)
  {
    console.log(id);
    this.router.navigate(['/home/book-view', id]);
  }
  
}