import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PDFSource } from 'pdfjs-dist';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {

  book: any;

  mediaType = 'application/pdf';
  src: String | PDFSource | ArrayBuffer = 'https://localhost:3000/api/public/upload/4CC3.pdf';

  constructor(private http: HttpClient, private route: ActivatedRoute, 
    private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }

  getBookDetails(id){
    this.auth.getBook(id).subscribe(data => {
      //console.log(data.bookPath);
      this.book = data;
      //data.bookPath = this.pdfSrc;
    });

  }

  viewBook(id){
    //this.router.navigate(['/home/userboard/book-view'], id);
  }
}
