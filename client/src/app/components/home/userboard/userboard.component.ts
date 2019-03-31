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

      //debugger
      this.auth.getAllBooks().subscribe(books => {
        //this.details = user;
        this.allBooks = books;
        
        
        //console.log(this.allBooks);
        /*this.auth.getASubscription(user._id).subscribe(bb => {
          //console.log(bb);
          this.subBookArr = bb;
          //console.log(this.allBooks[1]._id);
          /*for(let i = 0; i < this.allBooks.length; i++){
            //console.log(this.subBookArr.bookRef[i]._id);
            //break;
            if(this.allBooks[i]._id == this.subBookArr[i]._id){
              console.log(this.subBookArr.bookRef[i]._id);
              break;
            }
          }
        });*/
        

        /*for(let b of books){
          //console.log(b.uploadedBy);
          if(b.program == user.program._id){
            console.log("works");
            //this.allBooks = books;            
          }
          if(b.uploadedBy){
            //this.showCard = false;
            console.log("works");
          }
        }*/
        //console.log(books);
        
        //this.allBooksArr = [];
        //console.log(books);
        //for(this.u of this.allBooks){
        //  this.allBooksArr.push(this.allBooks[this.u]);
        //}
        //console.log(this.allBooks);
        
      }, (err) => {
        console.error(err);
      });
      
      //console.log(user._id);
      //this.showSubscribed(user._id);
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
