import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book = {};

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }

  getBookDetails(id: any){
    this.auth.getBook(id).subscribe(data => {
      console.log(data);
      this.book = data;
    });
  }

}
