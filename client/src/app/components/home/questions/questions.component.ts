import { Component, OnInit } from '@angular/core';
import {
  UserDetails,
  AuthenticationService
} from "../../../services/authentication.service";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  discussion: FormGroup;
  bookTitle: String;
  question: String;
  email: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit() {
    this.viewQuestion(this.route.snapshot.params["id"]);
    this.auth.profile().subscribe(user => {
      this.discussion = this.formBuilder.group({
            'bookTitle': [''],
            'question':[''],
            'email': user.email
          });
    });
    
  }
  
  postQuestion(form: NgForm) {
    let details = this.auth.getUserDetails();
    //let email = details.email;
    
    this.auth.addQuestion(form).subscribe(ques => {
      console.log(ques);
      //let id = ques["_id"];
      let id = ques._id;
      
      this.router.navigate(["/home/show_questions"]);
    });
    //this.viewQuestion(this.route.snapshot.params['id']);
  }

  viewQuestion(id) {
    this.auth.getQuestion(id).subscribe(ques => {
      console.log(ques);
      this.question = ques;
    });
  }

  /* onReply() {
    console.log(this.discussion.value);
  } */

  


}
