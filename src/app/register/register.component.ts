import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators'
import { AuthService } from '../shared/services/auth.service';


@Component({ 
    selector: 'app-register',
    templateUrl: 'register.component.html' })
export class RegisterComponent {

    registerForm = new FormGroup({
        email: new FormControl(null),
        password: new FormControl(null)
   });

    constructor(
        private Router: ActivatedRoute,
        private formBuilder: FormBuilder,
        public authService: AuthService
    ){

    }

    onSubmit() {
        this.authService.SignUp(this.registerForm.controls['email'].value, this.registerForm.controls['password'].value);
    }
}