import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedInGuard } from '../../guards/loggedIn.guard';
import { AuthGuard } from '../../guards/auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
    
    { path: '',component: LoginComponent },
      { path: 'login', canActivate:[LoggedInGuard], component: LoginComponent },
      { path: 'login/:token', canActivate:[LoggedInGuard], component: LoginComponent },
      { path: 'signup', canActivate:[LoggedInGuard], component: SignupComponent },
      { path: 'forgot-password', canActivate:[LoggedInGuard], component:ForgotPasswordComponent},
      { path: 'resetpassword/:token', component:ResetPasswordComponent},
      { path: 'change-password', canActivate:[AuthGuard], component:ResetPasswordComponent},
    ])
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
