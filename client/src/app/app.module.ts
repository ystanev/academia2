import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from  './material.module';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AllUsersComponent } from './components/admin/user/allUsers.component';
import { AllBooksComponent } from './components/admin/books/allBooks.component';
import { AllProgramsComponent } from './components/admin/programs/allPrograms.component';
import { UserboardComponent } from './components/home/userboard/userboard.component';
import { UploadComponent } from './components/home/upload/upload.component';
import { BooksComponent } from './components/home/books/books.component';
import { AccountComponent } from './components/home/account/account.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PaymentComponent } from './components/home/payment/payment.component';
import { BookDetailsComponent } from './components/home/book-details/book-details.component';
import { BookViewComponent } from './components/home/book-view/book-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    DashboardComponent,
    UserboardComponent,
    AllUsersComponent,
    AllBooksComponent,
    AllProgramsComponent,
    UploadComponent,
    BooksComponent,
    AccountComponent,
    PaymentComponent,
    FilterPipe,
    BookDetailsComponent,
    BookViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
