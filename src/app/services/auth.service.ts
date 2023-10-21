import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth) { }

  googleAuth(){
    //return this.afAuth.signInWithPopup(new GoogleAuthProvider())
    return this.afAuth.signInWithRedirect(new GoogleAuthProvider())
  }

  signUp(email:string, password:string)
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }
}
