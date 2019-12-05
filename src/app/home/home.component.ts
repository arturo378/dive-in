import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from '../shared/services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { CRUDService } from '../shared/services/crud.service';

@Component({ 
    selector: 'app-home',
    templateUrl: 'home.component.html'})

export class HomeComponent implements OnInit {

    user = null;
    userInfo: any;
    access=null;

    constructor(
        public firebase: AngularFireAuth,
        public authentication: AuthService,
        public router: Router,
        public userservice: CRUDService,
        ){
        
    }

    ngOnInit(){
    this.authentication.currentAccess.subscribe(access => this.access = access)

    this.user = this.firebase.auth.currentUser;

      if (this.user) {
        console.log(this.user);
          
      } else {
         // No user is signed in.
         this.router.navigate(['/']);
       }

       console.log(this.userInfo);
    }

    logout(){
        this.authentication.SignOut();
        this.authentication.changeAccess(4);
        this.router.navigate(['/']);
    }
}