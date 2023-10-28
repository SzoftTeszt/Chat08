import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  coll=true
  user:any=null;
  constructor(private auth:AuthService, private router:Router){
    this.auth.getLoggedUser().subscribe(
      (u)=>
        {
          this.user=u;
          // console.log("User:", this.user)
        }
    )
  }

  getIsSuperAdmin():boolean{
    return this.auth.getIsSuperAdmin()
  }

  signOut(){
    this.auth.signOut().then(
      ()=>this.router.navigate(['/home'])
    )
  }

}
