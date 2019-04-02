import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserDetails, TokenPayload } from '../../../services/authentication.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  allBooks:any;
  subBooks; any;
  uID :any;
  details: any;
  userForm: FormGroup;
  fName: string = '';
  lName: string = '';
  email: string = '';
  //password: string = '';
  program: string = '';

  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
     private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      'fName' : [null, Validators.required],
      'lName' : [null, Validators.required],
      'email' : [null, Validators.required],
      //'password' : [null, Validators.required],
      'program' : [null, Validators.required],
    });

    this.getAllBooks();
  }

  getUser(uID){
    this.auth.getAUser(uID).subscribe(user => {
      this.details = user;
      console.log(this.details._id);
      this.showSubscribed(user._id);

      this.uID = user._id;
      this.userForm.setValue({
        fName: user.fname,
        lName: user.lname,
        email: user.email,
        //password: user.email,
        program: user.program.programName
      });
    });
  }

  onFormSubmit(form: NgForm){
    this.auth.updateUser(this.uID, form).subscribe(res => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  getAllBooks(){
    this.auth.getAllBooks().subscribe(books => {
      for(let i = 0;i<books.length;i++){
        console.log(books[i].uploadedBy);
        //this.allBooks = books[i].uploadedBy;
      }
      
      this.allBooks = books;
    }, (err) => {
      console.error(err);
    });
  }

  showSubscribed(id){
    this.auth.getASubscription(id).subscribe(subs => {
      this.subBooks = subs.bookRef;
    }, (err) => {
      console.error(err);
    });
  }
}
