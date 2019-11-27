import { Component, OnInit } from '@angular/core';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

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
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  action: string;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: userData
  ) {
    console.log(data);
    this.user = {...data};
    this.action = this.user.action;
    this.user.password = null;

   }


   doAction(){
    this.dialogRef.close({event:this.action,data:this.user});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 

  ngOnInit() {
  }

}
