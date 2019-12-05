import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../shared/services/crud.service';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { notEqual } from 'assert';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfo: any;
  imgSrc: any = null;
  key: any = null;
  selectedImage: any = null;
  updateUserForm = new FormGroup({
    imageUrl: new FormControl(null),
    fname: new FormControl(null),
    lname: new FormControl(null),
    bday: new FormControl(null)
  });
  user = null;
  firstName: any;
  birthday: any;
  lastName: any;

  constructor(
    public userservice: CRUDService,
    public firebase: AngularFireAuth,
    private store: AngularFireStorage,
    public router: Router,
  ) { }

  ngOnInit() {
    this.user = this.firebase.auth.currentUser;

    if (this.user) {

      this.userservice.getUser(this.user.uid).subscribe(result =>{
        this.userInfo = result.map(x =>{
          return {
            fname: x.payload.doc.data()['first_name'],
            lname: x.payload.doc.data()['last_name'],
            birthdate: x.payload.doc.data()['birthdate'],
            picture: x.payload.doc.data()['picture'],
            access: x.payload.doc.data()['access'],
            guid: x.payload.doc.data()['GUID'],
            key: x.payload.doc.id
          };
          
        })
        this.imgSrc = this.userInfo[0]['picture'];
        this.key = this.userInfo[0]['key'];
      });
    
    } else {
       // No user is signed in.
       this.router.navigate(['/login']);
     }
  }


  showImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      //this.imgSrc = this.userInfo[0]['picture'];
      this.selectedImage = null;
    }
  }

  onSubmit() {

    this.firstName = this.updateUserForm.controls['fname'].value;
    this.lastName = this.updateUserForm.controls['lname'].value;
    this.birthday = this.updateUserForm.controls['bday'].value;


    var filePath = `users/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.store.ref(filePath);
    this.store.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.userservice.updateUser(this.key, url, this.firstName, this.lastName, this.birthday);
          })
        })
      ).subscribe();
    
      //this.router.navigate(['/profile']);
  }

}
