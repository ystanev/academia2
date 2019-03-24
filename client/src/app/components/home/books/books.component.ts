import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  book = {};

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getBookDetailes(this.route.snapshot.params['id']);
  }

  getBookDetailes(id){
    this.auth.getBook(id).subscribe(data => {
      console.log(data);
      this.book = data;
    });
  }



}
