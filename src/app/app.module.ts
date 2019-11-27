import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//project components
import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { EditMenuComponent } from './edit-menu';
import { TicketHistoryComponent } from './ticket-history';
import { TicketsComponent } from './tickets';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';


//importing html features
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import { 
  MatTableModule, 
  MatDialogModule, 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

//Firebase & Services
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AuthService } from './shared/services/auth.service';
import { CRUDService } from './shared/services/crud.service';
import { AngularFireStorageModule } from '@angular/fire/storage';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TicketHistoryComponent,
    TicketsComponent,
    EditMenuComponent,
    UserProfileComponent,
    UserEditComponent,
    DialogBoxComponent,
    UserDialogComponent
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
    DialogModule,
    PanelModule,
    AngularFireStorageModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule
  ],
  entryComponents:[
    DialogBoxComponent,
    UserDialogComponent
  ],
  providers: [AuthService,CRUDService],
  bootstrap: [AppComponent]

})
export class AppModule { }
