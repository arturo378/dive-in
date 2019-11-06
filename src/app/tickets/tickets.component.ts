import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth} from '@angular/fire/auth';
//import {AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AuthService} from '../shared/services/auth.service';
import { Router, RouterLink } from "@angular/router";
//import { FirebaseFirestore } from '@angular/fire';
import { CRUDService } from '../shared/services/crud.service';
import { Ticket } from '../shared/services/ticket_details';
import { throwIfEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  
  @Input() ticket: Ticket;

  items: Array<any>;


  constructor(
    public firebase: AngularFireAuth,
    public ticketservice: CRUDService,
    public authentication: AuthService,
    public router: Router
  ) {
     
   }

   
  ngOnInit() {
    var user = this.firebase.auth.currentUser;

      if (user) {
        this.ticketservice.getTickets().subscribe(result =>{
          this.items = result;
        });
        //console.log(this.items.toString);
      } else {
         // No user is signed in.
         this.router.navigate(['/login']);
       }


  }

  markComplete(dataItem){
    dataItem.Is_Active = false
    this.ticketservice.updateTicket(dataItem);
  }

}
