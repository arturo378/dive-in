import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {first} from 'rxjs/operators'
import { AuthService } from "../shared/services/auth.service";

@Component({
    selector:'app-login',
    templateUrl: 'login.component.html' ,
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl(null),
        password: new FormControl(null)
   });

    constructor(
        private router: ActivatedRoute,
        public authService: AuthService
    ){

    }

    ngOnInit(){
        
    }

    onSubmit() {
        ////console.warn(this.loginForm.value)
        //console.warn(this.loginForm.controls['email'].value);
        this.authService.SignIn(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    }
}
