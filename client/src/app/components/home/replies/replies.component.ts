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
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {

  quest: any;
  
  replyArea: boolean = false;

  replyForm: FormGroup;
  reply: String;
  questionReply: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.viewQuestion(this.route.snapshot.params["id"]);
    this.auth.getQuestion(this.route.snapshot.params["id"]).subscribe(ques => {
      this.replyForm = this.formBuilder.group({
        'reply': [''],
        'question': ques._id
      });
    });
  }

  postReply(form: NgForm) {
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
      this.quest = ques;
    });
  }

  showReplyArea() {
    this.replyArea = true;
    //this.router.navigate(['/home/replies', id]);
  }

  /* onReply() {
    console.log(this.discussion.value);
  } */

  replyQuestion(form: NgForm){

    this.auth.addReply(form).subscribe(rep => {
      console.log(rep);
    });
    this.router.navigate(['/home/show-questions']);
  }

}
