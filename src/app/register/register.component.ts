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
        password: new FormControl(null),
        fname: new FormControl(null),
        lname: new FormControl(null)
   });
   email: string;
   password: string;
   firstName: string;
   lastName: string;

    constructor(
        private Router: ActivatedRoute,
        public router: Router,
        private formBuilder: FormBuilder,
        public authService: AuthService
    ){

    }

    onSubmit() {
        this.email = this.registerForm.controls['email'].value;
        this.password = this.registerForm.controls['password'].value;
        this.firstName = this.registerForm.controls['fname'].value;
        this.lastName = this.registerForm.controls['lname'].value;

        this.authService.SignUp(this.email, this.password, this.firstName, this.lastName);
        this.router.navigate(['/login']);
    }
}