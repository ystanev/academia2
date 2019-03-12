import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';

@Component({
  selector: 'app-adminAllPrograms',
  templateUrl: './allPrograms.component.html',
  styleUrls: ['./allPrograms.component.css']
})
export class AllProgramsComponent implements OnInit {

  progInfo = {
    programName: ''
  };

  details: UserDetails;
  showUser:boolean = true;
  showDashboard:boolean = false;
  allProgs:any;
  showAddProgError:boolean = false;
  deleteClicked:boolean = false;
  
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getAllPrograms();
  }

  getAllPrograms(){
    this.auth.getAllPrograms().subscribe(programs => {
      this.allProgs = programs;
    }, (err) => {
      console.error(err);
    });

  }

  showDelModal(){
    this.deleteClicked = true;
  }

  addNewProgram(){
    if(this.progInfo.programName != '')
    {
      this.auth.program(this.progInfo).subscribe(() => {
        this.getAllPrograms();
        this.progInfo.programName = '';
        this.showAddProgError = false;
      }, (err) => {
        console.error(err);
      });
    }
    else
    {
      this.showAddProgError = true;
    }
  }

  deleteProgram(progID){
    let id = progID;
    this.auth.deletePrograms(id).subscribe(() => {
      this.getAllPrograms();
    }, (err) => {
      console.error(err);
    });
  }

  toggleDashboard()
  {
    this.showUser = false;
    this.showDashboard = true;
  }

}
