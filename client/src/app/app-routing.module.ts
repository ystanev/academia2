import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component'; 
import { AllUsersComponent } from './components/admin/user/allUsers.component';
import { AllBooksComponent } from './components/admin/books/allBooks.component';
import { AllProgramsComponent } from './components/admin/programs/allPrograms.component';
import { UserboardComponent } from './components/home/userboard/userboard.component';
import { BooksComponent } from './components/home/books/books.component';
import { AccountComponent } from './components/home/account/account.component';
import { UploadComponent } from './components/home/upload/upload.component';
import { PaymentComponent } from './components/home/payment/payment.component';
import { BookDetailsComponent } from './components/home/book-details/book-details.component';
import { BookViewComponent } from './components/home/book-view/book-view.component';
import { QuestionsComponent } from './components/home/questions/questions.component';
import { RepliesComponent } from './components/home/replies/replies.component';
import { ShowQuestionsComponent } from './components/home/show-questions/show-questions.component';


import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'userboard', component: UserboardComponent },
    { path: 'books/:id', component: BooksComponent }, 
    { path: 'account/:id', component: AccountComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'bookDetails/:id', component: BookDetailsComponent},
    { path: 'book-view/:id', component: BookViewComponent},
    { path: 'questions', component: QuestionsComponent},
    { path: 'replies/:id', component: RepliesComponent},
    { path: 'show-questions', component: ShowQuestionsComponent}
  ],  canActivate: [AuthGuardService] },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children: [{
    path: 'dashboard', component: DashboardComponent  
  },
 {path: 'user', component: AllUsersComponent},
 {path: 'books', component: AllBooksComponent},
 {path: 'programs', component: AllProgramsComponent}
] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
