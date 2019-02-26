import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component'; 
import { UserboardComponent } from './components/home/userboard/userboard.component';

import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [{
    path: 'userboard', component: UserboardComponent
  }],  canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children: [{
    path: 'dashboard', component: DashboardComponent
  }] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
