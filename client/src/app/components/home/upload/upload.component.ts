import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  bookForm: FormGroup;
  bookIsbn:string='';
  bookName:string='';
  bookAuthor:string='';
  bookPath:string = '';

  fileToUpload: File = null;
  constructor(private router: Router, private auth: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'bookIsbn' : [null, Validators.required],
      'bookName' : [null, Validators.required],
      'bookAuthor' : [null, Validators.required],
      'bookPath' : [null, Validators.required]
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  
  onFormSubmit(form: NgForm){
    this.uploadBook();

    var fileName = this.fileToUpload.name;
    var path = "/api/public/upload/";
    this.bookPath = path+fileName;

    this.auth.addBook(form).subscribe(data => {
      //data.bookPath = this.bookPath;
      //var fileName = this.fileToUpload.name;
      //var path = "/api/public/upload/";
      //data.bookPath = path+fileName;

      console.log(data.bookPath);

      let id = data['_id'];
      this.router.navigate(['/home/books', id]);
    }, (err) => {
      console.log(err);
    });
  }

  uploadBook(){
    this.auth.uploadFile(this.fileToUpload).subscribe(data =>{
      console.log(data);
    }, (err) => {
      console.error(err);
    });
  }
}
