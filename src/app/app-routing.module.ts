import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { TicketHistoryComponent } from './ticket-history';
import { TicketsComponent } from './tickets';
import { EditMenuComponent } from './edit-menu';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
//import { AuthGuard } from "../shared/guard/auth.guard";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'ticket-history', component: TicketHistoryComponent },
    { path: 'edit-menu', component: EditMenuComponent },
    { path: 'tickets', component: TicketsComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'users', component: UserEditComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);