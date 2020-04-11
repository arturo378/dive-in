import { Component, OnInit, ViewChild } from '@angular/core';
import { CRUDService } from '../shared/services/crud.service';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AngularFireAuth} from '@angular/fire/auth';

export interface menuItemData {
  id: string;
  category: string;
  description: string;
  name: string;
  pic: string;
  price: DoubleRange;
}

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  //Arrays to pull main menu items
  pizzas: Array<any>;
  burgers: Array<any>;
  sides: Array<any>;
  cocktails: Array<any>;
  beverages: Array<any>;
  access = 0;
  user = null;
  userInfo: any;

  display: boolean = false;
  displayedColumns: string[] = ['name', 'category', 'description', 'price', 'action'];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(
    public menuService: CRUDService,
    public dialog: MatDialog,
    private store: AngularFireStorage,
    public firebase: AngularFireAuth,
    public crud: CRUDService,
    public router: Router
  ) { }

  ngOnInit() {

    this.user = this.firebase.auth.currentUser;
    if (this.user) {
    
    } else {
       // No user is signed in.
       this.router.navigate(['/']);
     }

    //to pull pizzas
    this.menuService.getPizzas().subscribe(result =>{
      this.pizzas = result.map(x =>{
        return {
          id: x.payload.doc.id,
          category: x.payload.doc.data()['category'],
          description: x.payload.doc.data()['description'],
          name: x.payload.doc.data()['name'],
          pic: x.payload.doc.data()['pic'],
          price: x.payload.doc.data()['price']
        };
      
      })
    });

    //To pull burgers
    this.menuService.getBurgers().subscribe(result =>{
      this.burgers = result.map(x =>{
        return {
          id: x.payload.doc.id,
          category: x.payload.doc.data()['category'],
          description: x.payload.doc.data()['description'],
          name: x.payload.doc.data()['name'],
          pic: x.payload.doc.data()['pic'],
          price: x.payload.doc.data()['price']
        };
      
      })
    });

    //to pull sides
    this.menuService.getSides().subscribe(result =>{
      this.sides = result.map(x =>{
        return {
          id: x.payload.doc.id,
          category: x.payload.doc.data()['category'],
          description: x.payload.doc.data()['description'],
          name: x.payload.doc.data()['name'],
          pic: x.payload.doc.data()['pic'],
          price: x.payload.doc.data()['price']
        };
      
      })
    });

    //to pull cocktails and beers
    this.menuService.getCocktails().subscribe(result =>{
      this.cocktails = result.map(x =>{
        return {
          id: x.payload.doc.id,
          category: x.payload.doc.data()['category'],
          description: x.payload.doc.data()['description'],
          name: x.payload.doc.data()['name'],
          pic: x.payload.doc.data()['pic'],
          price: x.payload.doc.data()['price']
        };
      
      })
    });

    //to pull beverages
    this.menuService.getBeverages().subscribe(result =>{
      this.beverages = result.map(x =>{
        return {
          id: x.payload.doc.id,
          category: x.payload.doc.data()['category'],
          description: x.payload.doc.data()['description'],
          name: x.payload.doc.data()['name'],
          pic: x.payload.doc.data()['pic'],
          price: x.payload.doc.data()['price']
        };
      
      })
    });
  }

  openDialog(action, item, foodType){
    item.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      data:item
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data, foodType);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data, foodType);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data, foodType);
      }
    });
  }


  addRowData(item, type){
    //console.log(item.type);
    if(item.selImage == null){
      this.crud.addMenuItems(item, null, type);
    }
    else{
    var filePath = `${type}/${item.selImage}_${new Date().getTime()}`;
    const fileRef = this.store.ref(filePath);
    this.store.upload(filePath, item.selImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.crud.addMenuItems(item, url, type);
          })
        })
      ).subscribe();
    }

    this.table.renderRows();
    
  }
  
  updateRowData(item, type){
    if(item.selImage == null){
      this.crud.updateMenuItem(item, null, type);
    }
    else{
    var filePath = `${type}/${item.selImage}_${new Date().getTime()}`;
    const fileRef = this.store.ref(filePath);
    this.store.upload(filePath, item.selImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.crud.updateMenuItem(item, url, type);
          })
        })
      ).subscribe();
    }

  }


  deleteRowData(item, type){
    this.crud.deleteMenuItems(item, type);
  }


}
