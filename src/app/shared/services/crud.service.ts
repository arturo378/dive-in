import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ticket } from './ticket_details';


@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  private dbPath = '/tickets';
  //ticketRef: AngularFirestoreCollection<Ticket> = null;

  constructor(
    
    private db: AngularFirestore,
    private ticket: AngularFirestore,
    private user: AngularFirestore
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

  getSides(){
    return this.ticket.collection('/sides').snapshotChanges();
  }

  getUser(uid){
    return this.user.collection('/users',ref => ref.where('GUID', '==', uid)).snapshotChanges();
  }

  getUserAccess(uid){
    
  return this.user.collection('/users',ref => ref.where('GUID', '==', uid));
  
  }



  getUsers(){
    return this.user.collection('/users').snapshotChanges();
  }


   //------------------------------------UPDATE FUNCTIONS---------------------------------------------

  updateMenuItem(data, url, type){

    var DBpath = null;
    if(type == 'Pizza'){
      DBpath = '/pizza';
    }
    else if(type=='Beverages'){
      DBpath = '/beverages';
    }
    else if(type=='Burger'){
      DBpath = '/burgers';
    }
    else if(type=='Alcohol'){
      DBpath = '/cocktails_beer';
    }
    else if(type=='sides'){
      DBpath = '/sides';
    }
    
    

    if(url == null){
      this.ticket.firestore.collection(DBpath)
      .doc(data.id)
      .update({category: data.category, description: data.description, name: data.name, pic: data.pic, price: data.price});
    }
    else{
      this.ticket.firestore.collection(DBpath)
      .doc(data.id)
      .update({category: data.category, description: data.description, name: data.name, pic: url, price: data.price});
    }

  }


  updateUser(key, image, fname, lname, bday){
    this.ticket.firestore.collection('/users')
    .doc(key)
    .update({first_name: fname, last_name: lname, birthdate: bday, picture: image});
  }

  updateUserList(data){
    this.ticket.firestore.collection('/users')
    .doc(data.id)
    .update({first_name: data.fname , last_name: data.lname, birthdate: data.birthdate, access: data.access});
  }

   //------------------------------------ADD FUNCTIONS---------------------------------------------

  addMenuItems(data, url, type){
    var DBpath = null;
    if(type=='Pizza'){
      DBpath = '/pizza';
    }
    else if(type=='Beverages'){
      DBpath = '/beverages';
    }
    else if(type=='Burger'){
      DBpath = '/burgers';
    }
    else if(type=='Alcohol'){
      DBpath = '/cocktails_beer';
    }
    else if(type=='sides'){
      DBpath = '/sides';
    }

    this.ticket.firestore.collection(DBpath)
    .add({category: data.category, description: data.description, name: data.name, pic: url, price: data.price});


  }



 //------------------------------------DELETE FUNCTIONS---------------------------------------------

  deleteMenuItems(data, type){
    var DBpath = null;
    if(type=='Pizza'){
      DBpath = '/pizza';
    }
    else if(type=='Beverages'){
      DBpath = '/beverages';
    }
    else if(type=='Burger'){
      DBpath = '/burgers';
    }
    else if(type=='Alcohol'){
      DBpath = '/cocktails_beer';
    }
    else if(type=='sides'){
      DBpath = '/sides';
    }

    this.ticket.firestore.collection(DBpath).doc(data.id).delete();
  }

  deleteUser(data){

  }


  updateTicket(key, data){
    return this.ticket.firestore.collection(this.dbPath)
    .doc(key)
    .update(data);
  }


}
