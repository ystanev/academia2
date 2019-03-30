import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  id: any;
  allProgs:any;
  uID:any;
  bookForm: FormGroup;
  bookIsbn:string='';
  bookName:string='';
  bookAuthor:string='';
  bookPath:string = '';
  bookPrice:string = '';
  program:string = '';
  uploadedBy:string = '';

  fileToUpload: File = null;
  constructor(private router: Router, private route: ActivatedRoute, 
    private auth: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllPrograms();
    this.auth.profile().subscribe(user => {
      this.bookForm = this.formBuilder.group({
        'bookIsbn' : [null, Validators.required],
        'bookName' : [null, Validators.required],
        'bookAuthor' : [null, Validators.required],
        'bookPath' : [null, Validators.required],
        'bookPrice' : [null, Validators.required],
        'program' : [null, Validators.required],
        'uploadedBy' : user._id
      });
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  getAllPrograms(){
    this.auth.getAllPrograms().subscribe(programs => {
      this.allProgs = programs;
    }, (err) => {
      console.error(err);
    });

  }
  
  onFormSubmit(form: NgForm){
    this.uploadBook();

    var fileName = "/api/public/upload/"+this.fileToUpload.name;
    //var path = "/api/public/upload/";
    this.bookPath = fileName;

    this.auth.addBook(form).subscribe(data => {
      data.bookPath = this.bookPath;
      //var fileName = this.fileToUpload.name;
      //var path = "/api/public/upload/";
      //data.bookPath = path+fileName;

      /*this.bookForm.setValue({
        bookIsbn: data.bookIsbn,
        bookName: data.bookName,
        bookAuthor: data.bookAuthor,
        bookPath: data.bookPath});
      console.log(data.bookPath);*/

      let id = data['_id'];
      this.router.navigate(['/home/books', id]);
    }, (err) => {
      console.log(err);
    });
  }

  onChange(event){
    this.program =  event.target.value;
    console.log(this.program);
  }

  uploadBook(){
    this.auth.uploadFile(this.fileToUpload).subscribe(data =>{
      console.log(data);
    }, (err) => {
      console.error(err);
    });
  }
}
