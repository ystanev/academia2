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
  subBooks: any;
  allBooksArr: any;
  subBookArr: any;
  u: any;
  showPop:boolean = false;
  searchBoxClicked:boolean = false;
  showCard: boolean = true;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {

      this.details = user;
      this.showSubscribed(user._id);

      
      this.auth.getAllBooks().subscribe(books => {
     
        this.allBooks = books;
        
      }, (err) => {
        console.error(err);
      });
    });
  }

  showSubscribed(id){
    if(this.auth.getASubscription(id) != null){
      this.auth.getASubscription(id).subscribe(subs => {
            
        this.subBooks = subs.bookRef;
      }, (err) => {
            console.error(err);
      });
    }else {
      console.log("no books found");
    }
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
