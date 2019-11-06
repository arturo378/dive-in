import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from '../shared/services/auth.service';
import { Router, RouterLink } from "@angular/router";

@Component({ 
    selector: 'app-home',
    templateUrl: 'home.component.html' })

export class HomeComponent {

    constructor(
        public firebase: AngularFireAuth,
        public authentication: AuthService,
        public router: Router
        ){
        
    }

    ngOnInit(){
      var user = this.firebase.auth.currentUser;

      if (user) {
         // User is signed in.
      } else {
         // No user is signed in.
         this.router.navigate(['/']);
       }
    }

    logout(){
        this.authentication.SignOut();
    }
}