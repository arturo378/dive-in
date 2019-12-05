import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { BehaviorSubject} from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, RouterLink } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthService {

    userData: any;
    public accessSource = new BehaviorSubject(4);
    currentAccess = this.accessSource.asObservable();

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

      changeAccess(access: number){
        this.accessSource.next(access);
      }
    
      // Sign in with email/password
      SignIn(email, password) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
        //this.router.navigate(['/home']);
      }

      SignUp(email, password, fname, lname) {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((result) => {
            this.SetUserData(email, fname, lname, result.user.uid);
          }).catch((error) => {
            window.alert(error.message)
          });
      
      }

      addEmployeeUser(email, password, fname, lname, access) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
              this.SetEmployeeData(email, fname, lname, result.user.uid, access);
            }).catch((error) => {
              window.alert(error.message)
            });
        
        }

        SetEmployeeData(email, fname, lname, guid, access){  
          return this.afs.collection('users').add(
            {
              email: email,
              first_name: fname,
              last_name: lname,
              access: access,
              birthdate: '',
              GUID: guid,
              picture:''
  
            }
          );
  
        }

      SetUserData(email, fname, lname, guid){  
        return this.afs.collection('users').add(
          {
            email: email,
            first_name: fname,
            last_name: lname,
            access: 1,
            birthdate: '',
            GUID: guid,
            picture:''

          }
        );

      }

      SignOut() {
        this.afAuth.auth.signOut().then(() => {
         // this.router.navigate(['/']);
        })
      }

  }