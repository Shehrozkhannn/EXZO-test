import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const routes: Routes = [
  {path: '' , component: DashboardComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'admin-panel' , component: AdminPanelComponent},
];
