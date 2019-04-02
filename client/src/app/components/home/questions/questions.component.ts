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

  question = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}
  
  discussion = new FormGroup({
    bookTitle: new FormControl(""),
    question: new FormControl(""),
    
  });


  postQuestion(form: NgForm) {
    let details = this.auth.getUserDetails();
    let email = details.email;

    this.auth.addQuestion(form).subscribe(ques => {
      console.log(ques);
      //let id = ques["_id"];
      // this.router.navigate(["/home/show_questions/"]);
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

  ngOnInit() {
    this.viewQuestion(this.route.snapshot.params["id"]);
  }


}
