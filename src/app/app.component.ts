import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from './shared/services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { CRUDService } from './shared/services/crud.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  access: any = null;
  user =  null;
  userInfo: any;
  imgSrc: any = null;
  key: any = null;

  constructor(
    public firebase: AngularFireAuth,
    public router: Router,
    public userservice: CRUDService
    ){
    
}
 
  ngOnInit(){
    this.user = this.firebase.auth.currentUser;

    if (this.user) {
      
      this.userservice.getUser(this.user.uid).subscribe(result =>{
        this.userInfo = result.map(x =>{
          return {
            access: x.payload.doc.data()['access']
          };
          
        })
      });

      

    } else {
       // No user is signed in.
       console.log(this.access);
       this.router.navigate(['/login']);
     }
  }

}