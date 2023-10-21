import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './part/home/home.component';
import { SingupComponent } from './part/singup/singup.component';
import { SinginComponent } from './part/singin/singin.component';
import { ForgotPasswordComponent } from './part/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './part/verify-email/verify-email.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", redirectTo:""},
  {path:"signup", component:SingupComponent},
  {path:"signin", component:SinginComponent},
  {path:"forgotpassword", component:ForgotPasswordComponent},
  {path:"verifyemail", component:VerifyEmailComponent},

  {path:"**", redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
