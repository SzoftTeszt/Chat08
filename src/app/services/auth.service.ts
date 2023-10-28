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
  user:any={}
  defaultClaims = {superAdmin:false, admin:false, informatikus:false}

  constructor(private afAuth:AngularFireAuth,
    private router:Router, private http: HttpClient) {
      this.getLoggedUser().subscribe(
        (user)=>{
          if (user){
            this.user=user
            console.log("Belépés", user)
            // if (!this.user.displayName) this.user.displayName=this.user.email
            user.getIdToken().then(
              (token)=>
                {
                  console.log("Belépés(token): ",token)
                  this.user.token=token
                  this.getClaims(this.user.uid).subscribe(
                    (claims)=> {
                      if (claims)
                        this.user.claims=claims
                      else{
                        this.setCustomClaims(this.user.uid, this.defaultClaims)
                      }
                    }                   
                    
                  )
                }
            )
          }
          else this.user=null
        }
      )
     }
  
     getIsSuperAdmin(){
      if (this.user && this.user.claims) return this.user.claims.superAdmin
      else return false
     }

  getClaims(uid:string){
    let headers = new HttpHeaders().set('Authorization', this.user.token)
    return this.http.get(this.url+'users/'+uid+'/claims', {headers})  
  }

  getUsers(){   
    console.log("Felhasználók(user)", this.user)
    if (this.user) {
            let headers = new HttpHeaders().set('Authorization', this.user.token)
            return this.http.get(this.url+'users', {headers})  
    }
    return null
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
  // uid:any,claims:any
  setCustomClaims( uid:any,claims:any){
      console.log("Claims, user", this.user)
      // const uid="NxDNrtTBxAM0puyve9nsZecyHys1"
      // const claims = {superAdmin:true, admin:false, informatikus:true}
      const body= {uid, claims}
      let headers = new HttpHeaders().set('Authorization', this.user.token)
      this.http.post(this.url+'setCustomClaims',body, {headers}).
              subscribe({
                next:()=>console.log("A claims beállítása sikeres!"),
                error:(e)=>console.log("Hiba a claimsnél: ",e)
              })
            }
}
