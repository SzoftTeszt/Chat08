import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './part/home/home.component';
import { SingupComponent } from './part/singup/singup.component';
import { SinginComponent } from './part/singin/singin.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", redirectTo:""},
  {path:"signup", component:SingupComponent},
  {path:"signin", component:SinginComponent},
  {path:"**", redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
