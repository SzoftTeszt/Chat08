import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingupComponent } from './part/singup/singup.component';
import { SinginComponent } from './part/singin/singin.component';
import { HomeComponent } from './part/home/home.component';
import { NavComponent } from './part/nav/nav.component';
import { Enviroments } from './enviroments';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    SinginComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(Enviroments.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
