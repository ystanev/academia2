import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: any;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { }

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
        //this.router.navigate(['/home/userboard']);
      }
    }, (err) => {
      console.log(err);
    });

  }

  openPaypal(){
    this.purchase();
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '250px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
