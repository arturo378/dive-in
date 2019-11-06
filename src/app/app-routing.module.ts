import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { MenuComponent } from './menu';
import { TicketsComponent } from './tickets';
import { EditMenuComponent } from './edit-menu';
//import { AuthGuard } from "../shared/guard/auth.guard";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'edit-menu', component: EditMenuComponent },
    { path: 'tickets', component: TicketsComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);