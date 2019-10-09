import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MenuItem} from 'primeng/api'; 
import {ButtonModule} from 'primeng/button';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Firebase
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from "./shared/services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'dive-in')
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]

})
export class AppModule { }
