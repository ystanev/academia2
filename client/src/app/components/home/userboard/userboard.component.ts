import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';


@Component({
  selector: 'app-userboard',
  templateUrl: './userboard.component.html',
  styleUrls: ['./userboard.component.css']
})
export class UserboardComponent implements OnInit {

  allBooks: any;
  allBooksArr: any;
  u: any;
  
  constructor(private auth: AuthenticationService) { }

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

}
