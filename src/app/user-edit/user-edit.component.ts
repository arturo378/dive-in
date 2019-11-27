import { Component, OnInit, ViewChild } from '@angular/core';
import { CRUDService } from '../shared/services/crud.service';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UserDialogComponent } from '../user-dialog';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { AngularFireAuthModule, AngularFireAuth} from '@angular/fire/auth';

export interface userData {
  id: string;
  guid: string;
  fname: string;
  lname: string;
  birthdate: string;
  access: Int16ArrayConstructor;
  email: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  allUsers: any;

  display: boolean = false;
  displayedColumns: string[] = ['fname', 'lname', 'birthdate', 'access', 'action'];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
 
  constructor(
    public users: CRUDService,
    public dialog: MatDialog,
    public addUser: AuthService,
    public firebase: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit() {

    var user = this.firebase.auth.currentUser;

    if (user) {
    //to pull users
    this.users.getUsers().subscribe(result =>{
      this.allUsers = result.map(x =>{
        return {
          id: x.payload.doc.id,
          guid: x.payload.doc.data()['GUID'],
          fname: x.payload.doc.data()['first_name'],
          lname: x.payload.doc.data()['last_name'],
          birthdate: x.payload.doc.data()['birthdate'],
          access: x.payload.doc.data()['access'],
          email: x.payload.doc.data()['email']
        };
      
      })
    });
  }else {
    // No user is signed in.
    this.router.navigate(['/login']);
  }

  }

  openDialog(action, item){
    item.action = action;
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '50%',
      data:item
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }


  addRowData(item){
  this.addUser.addEmployeeUser(item.email, item.password, item.fname, item.lname, item.access);
  this.table.renderRows();
    
  }
  
  updateRowData(item){
    this.users.updateUserList(item)

  }
  deleteRowData(item){
    this.users.deleteUser(item);
  }

}
