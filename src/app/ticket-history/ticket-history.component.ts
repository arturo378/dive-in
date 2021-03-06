import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth} from '@angular/fire/auth';
//import {AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AuthService} from '../shared/services/auth.service';
import { Router, RouterLink } from "@angular/router";
//import { FirebaseFirestore } from '@angular/fire';
import { CRUDService } from '../shared/services/crud.service';
import { Ticket } from '../shared/services/ticket_details';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css']
})
export class TicketHistoryComponent implements OnInit {


  items: Array<any>;
  data: any;

  constructor(
    public firebase: AngularFireAuth,
    public ticketservice: CRUDService,
    public authentication: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

    var user = this.firebase.auth.currentUser;

    if (user) {

      this.ticketservice.getTickets().subscribe(result =>{
        this.items = result.map(x =>{
          return {
            id: x.payload.doc.data()['ID'],
            key: x.payload.doc.id,
            comments: x.payload.doc.data()['Comments'],
            date: new Date(x.payload.doc.data()['Date'].seconds*1000),
            entree: JSON.parse(x.payload.doc.data()['Entree']),
            drink: JSON.parse(x.payload.doc.data()['Drink']),
            active: x.payload.doc.data()['Is_active'],
            side: JSON.parse(x.payload.doc.data()['Side']),
            space: x.payload.doc.data()['space_id'],
            status: x.payload.doc.data()['Status']
          };
        
        })
        this.items = this.items.sort((a, b) => b.date - a.date);
        console.log(this.items);
      });
    } else {
       // No user is signed in.
       this.router.navigate(['/login']);
     }


  }

}
