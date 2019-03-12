import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadInfo = {
    fileName: ''
  }

  book: any;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  uploadBook(){
    this.auth.addBook(this.uploadInfo).subscribe(data =>{
      debugger
      console.log(data);
    }, (err) => {
      console.error(err);
    });
  }
}
