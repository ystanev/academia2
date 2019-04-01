import { Component, OnInit, AfterViewChecked, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  book: any;
  details: UserDetails;
  allBooks: any;
  subBooks: any;
  constructor(public dialogRef: MatDialogRef<PaymentComponent>, 
    private route: ActivatedRoute, private router: Router, private auth: AuthenticationService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  addScript = false;
  paypalLoad = true;

  finalAmount:any;
  notValidMsg:boolean = false;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ASozFj0kcXqjYSHGvge7VYmlXTmfinXlYIcV4ApdSB7f9C7d4CvPYPjIspMDHdl00NZ11dv03Obj2t7H',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'CAD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // Do something when payment is successful.
        this.onNoClick();
        //this.purchase();
        console.log("Payment was successful");
        this.router.navigate(['/home/userboard']);
      });
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  calcTotalPrice(event, price)
  {
    this.finalAmount = event.target.value * price;
    console.log("totCost---------------->"+this.finalAmount);
  }

  addPaypalScript() {
      this.addScript = true;
      return new Promise((resolve, reject) => {
        const scripttagElement = document.createElement('script');
        scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
        scripttagElement.onload = resolve;
        document.body.appendChild(scripttagElement);
      });
  }

}
