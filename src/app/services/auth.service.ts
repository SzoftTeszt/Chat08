import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth,
    private router:Router) { }

  googleAuth(){
    //return this.afAuth.signInWithPopup(new GoogleAuthProvider())
    // this.afAuth.signInWithRedirect(new GoogleAuthProvider()).then(
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (u)=>{
        console.log("Google regisztráció",u)
        this.router.navigate(['/home'])
      }
    )
  }

  signUp(email:string, password:string)
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  signIn(email:string, password:string)
  {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  signOut(){
    return this.afAuth.signOut()
  }

  getLoggedUser(){
    return this.afAuth.authState
  }
}
