import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {first} from 'rxjs/operators'
import { AuthService } from "../shared/services/auth.service";
import { CRUDService } from "../shared/services/crud.service";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector:'app-login',
    templateUrl: 'login.component.html' ,
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    access=null;
    curUser: Array<any>;
    loginForm = new FormGroup({
        email: new FormControl(null),
        password: new FormControl(null)
   });

    constructor(
        public authService: AuthService,
        public userService: CRUDService,
        public firebase: AngularFireAuth,
        public router: Router

    ){

    }

    ngOnInit(){
        this.authService.currentAccess.subscribe(access => this.access = access)
    }

    onSubmit() {
        ////console.warn(this.loginForm.value)
        //console.warn(this.loginForm.controls['email'].value);
        this.authService.SignIn(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
        var user = this.firebase.auth.currentUser;
        this.userService.getUser(user.uid).subscribe(result =>{
            this.curUser = result.map(x =>{
              return {
                access: x.payload.doc.data()['access']
              };
            })
            //this.access = this.curUser['access'];
            //console.log(this.curUser);
          });
        //console.log((this.curUser[0]['access']));
        this.authService.changeAccess(this.curUser[0]['access']);
        this.router.navigate(['/home']);
    }
}
