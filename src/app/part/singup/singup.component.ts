import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  email:string=""
  password:string=""

  constructor(private auth:AuthService, 
    private base:BaseService){}

  googleAuth(){
    this.auth.googleAuth().then(
      ()=>console.log("Sikeres google regisztráció!")
    ).catch(
      (e)=>console.log(e)
    )
  }

  addMessage(){
    this.base.addMessage("")
  }

  signUp(){
    this.auth.signUp(this.email, this.password).then(
      ()=>console.log("Szép az élet")
    ).catch(
      (e)=>console.log(e)
    )
  }
}
