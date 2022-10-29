import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../gaurds/login.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'inscription', canActivate: [LoginGuard], component: InscriptionComponent },
  { path: 'forgot-password', canActivate: [LoginGuard], component: ForgotPasswordComponent },
  { path: 'reset-password/:token', canActivate: [LoginGuard], component: ResetPasswordComponent },
  { path: 'account-activation/:code', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
