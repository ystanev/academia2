import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-show-questions',
  templateUrl: './show-questions.component.html',
  styleUrls: ['./show-questions.component.css']
})
export class ShowQuestionsComponent implements OnInit {

  ques: any;
  replyArea: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    console.log("show");
    this.showAllQuestions();
  }

  showAllQuestions() {
    this.auth.getAllQuestions().subscribe(data => {
      console.log(data);
      this.ques = data;
    });
  }

  showReplyArea() {
    this.replyArea = true;
  }

  

  /* showAllQuestions(id){
    this.auth.getQuestion(id).subscribe(data => {
      console.log(data);
      this.ques = data;
    });
  } */
}
