import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, RouterLink } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthService {

    userData: any;

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,  
        public ngZone: NgZone // NgZone service to remove outside scope warning
      ) {

        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
          if (user) {
          
          } else {
            
          }
        })

      }
    
      // Sign in with email/password
      SignIn(email, password) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          this.router.navigate(['/home']);
        });
      }

      afterSignIn(){
        this.router.navigate(['/home']);
      }


  


      SignUp(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((result) => {
            //this.SetUserData(result.user);
          }).catch((error) => {
            window.alert(error.message)
          })
      }

      SignOut() {
        return this.afAuth.auth.signOut().then(() => {
          this.router.navigate(['/']);
        })
      }

  }