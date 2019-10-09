import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({ 
    selector: 'app-register',
    templateUrl: 'register.component.html' })
export class RegisterComponent {

    constructor(
        private Router: ActivatedRoute,
        private formBuilder: FormBuilder
    ){

    }

    onSubmit() {
        
    }
}