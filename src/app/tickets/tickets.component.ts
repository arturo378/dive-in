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
  data: any;
  access = 1;
  curUser: Array<any>;



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
          this.items = result.map(x =>{
            return {
              ID: x.payload.doc.data()['ID'],
              key: x.payload.doc.id,
              Comments: x.payload.doc.data()['Comments'],
              Date: new Date(x.payload.doc.data()['Date'].seconds*1000),
              Entree: JSON.parse(x.payload.doc.data()['Entree']),
              Drink: JSON.parse(x.payload.doc.data()['Drink']),
              Is_active: x.payload.doc.data()['Is_active'],
              Side: JSON.parse(x.payload.doc.data()['Side']),
              space_id: x.payload.doc.data()['space_id'],
              Status: x.payload.doc.data()['Status']
            };
          
          })
          this.items = this.items.sort((a, b) => a.Date - b.Date);
          console.log(this.items);
        });
      } else {
         // No user is signed in.
         this.router.navigate(['/login']);
       }


  }

  markComplete(dataItem){
    dataItem.Is_active = false
    dataItem.Entree = JSON.stringify(dataItem.Entree);
    dataItem.Drink = JSON.stringify(dataItem.Drink);
    dataItem.Side = JSON.stringify(dataItem.Side);
    this.ticketservice.updateTicket(dataItem.key, dataItem);
  }



}
