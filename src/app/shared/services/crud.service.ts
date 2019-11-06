import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ticket } from './ticket_details';
import { resolve, reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  private dbPath = '/tickets';
  //ticketRef: AngularFirestoreCollection<Ticket> = null;

  constructor(
    
    private db: AngularFirestore,
    private ticket: AngularFirestore
  ) { 
   // this.ticketRef 
    //this.ticket = ticket.collection(this.dbPath).snapshotChanges();
  }

  //------------------------------------GET FUNCTIONS---------------------------------------------

  getTickets(){
    return this.ticket.collection(this.dbPath).snapshotChanges();
  }

  getBeverages(){
    return this.ticket.collection('/beverages').snapshotChanges();
  }

  getPizzas(){
    return this.ticket.collection('/pizza').snapshotChanges();
  }

  getBurgers(){
    return this.ticket.collection('/burgers').snapshotChanges();
  }

  getCocktails(){
    return this.ticket.collection('/cocktails_beer').snapshotChanges();
  }

   //------------------------------------UPDATE FUNCTIONS---------------------------------------------

  updateBeverages(){
    
  }

  updatePizzas(){

  }

  updateBurgers(){

  }

  updateCocktails(){
    
  }

   //------------------------------------ADD FUNCTIONS---------------------------------------------

  addBeverages(){

  }

  addPizzas(){

  }

  addBurgers(){

  }

  addCocktails(){
    
  }

 //------------------------------------DELETE FUNCTIONS---------------------------------------------

  deleteBeverages(){

  }

  deletePizzas(){

  }

  deleteBurgers(){

  }

  deleteCocktails(){
    
  }

  updateTicket(data){
    return this.ticket.firestore.collection(this.dbPath)
    .doc(data.payload.doc.id)
    .set(data);
  }


}
