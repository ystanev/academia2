import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { nextContext } from '@angular/core/src/render3';


@Component({
  selector: 'app-userboard',
  templateUrl: './userboard.component.html',
  styleUrls: ['./userboard.component.css']
})
export class UserboardComponent implements OnInit {

  details: UserDetails;
  allBooks: any;
  subBooks: any;
  allBooksArr: any;
  u: any;
  showPop:boolean = false;
  searchBoxClicked:boolean = false;
  booksAvailable:boolean = false;
  booksAvailableMsg:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {

      this.details = user;
      //console.log(user);
      this.auth.getAllBooks().subscribe(books => {
        this.allBooks = books;
        // this.allBooksArr = [];
        // for(this.u of this.allBooks){
        //  this.allBooksArr.push(this.allBooks[this.u]);
        // }
        for(let i = 0; i < this.allBooks.length; i++)
        {
          console.log(this.allBooks[i].program);
          if(user.program._id == this.allBooks[i].program)
          {
            this.booksAvailable = true;
            this.booksAvailableMsg = false;
            break;
          }
          else{
            this.booksAvailable = false;
            this.booksAvailableMsg = true;
          }
        }
      }, (err) => {
        console.error(err);
      });
      
      this.showSubscribed(user._id);
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
