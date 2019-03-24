import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: any;


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

  purchase(){
    let userDetails = this.auth.getUserDetails()
    let userId = userDetails._id;
    let bookId = this.book._id;

    let subscription = {
      "userId": userId,
      "bookId": bookId 
    };

    this.auth.addSubscription(subscription).subscribe(data => {
      if(data.alreadyExists != null && data.alreadyExists){
        alert("Book Already Purchased");
      }else{
        this.router.navigate(['/home/userboard']);
      }
    }, (err) => {
      console.log(err);
    });

  }

}
