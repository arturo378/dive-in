import { Component, OnInit } from '@angular/core';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

export interface menuItemData {
  id: string;
  category: string;
  description: string;
  name: string;
  pic: string;
  price: DoubleRange;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action: string;
  item: any;
  imgSrc: any;
  selectedImage: any;
  formGroup = new FormGroup({
    imageUrl: new FormControl(null)
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: menuItemData
  ) {
    console.log(data);
    this.item = {...data};
    this.action = this.item.action;
    this.imgSrc = this.item.pic;
   }

   showImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.item.selImage = this.selectedImage;
    }
    else {
      this.selectedImage = null;
    }
  }

   doAction(){
     console.log(this.item);
         this.dialogRef.close({event:this.action,data:this.item});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 

  ngOnInit() {
  }

}
