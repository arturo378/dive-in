import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';

//Firebase
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AuthService } from './shared/services/auth.service';
import { MenuComponent } from './menu';
import { TicketsComponent } from './tickets';
import { CRUDService } from './shared/services/crud.service';
import { EditMenuComponent } from './edit-menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    TicketsComponent,
    EditMenuComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TabViewModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'dive-in'),
    AngularFirestoreModule,
    CardModule,
    FieldsetModule,
    TableModule,
    BrowserAnimationsModule,
    DialogModule
  ],
  providers: [AuthService,CRUDService],
  bootstrap: [AppComponent]

})
export class AppModule { }
