import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://us-central1-chat08new.cloudfunctions.net/api/"
  
  constructor(private afAuth:AngularFireAuth,
    private router:Router, private http: HttpClient) { }

  getUsers(){
    this.getLoggedUser().subscribe(
      (user)=>{
        user?.getIdToken().then(
          (t)=>{
            let headers = new HttpHeaders().set('Authorization', t)
            return this.http.get(this.url+'users', {headers}).
            subscribe({
              next:(users)=>console.log(users),
              error:(e)=>console.log(e)
            })
          }
        )
      }
    )
  }
    

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

  sendVerificationEmail(){
    this.afAuth.currentUser.then(
      (user)=>user?.sendEmailVerification()
    ).then(
      ()=>this.router.navigate(['verifyemail'])
    )
    .catch((e)=>console.log(e))
  }

  forgotPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(email)
  }



}
