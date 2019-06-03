import { Component, OnInit } from '@angular/core';
import { AuthService, userData } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from "../shared/user-data.service";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { reject } from 'q';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  user: firebase.User;
  userData: any;
  constructor(private auth: AuthService,
    private router: Router,
    private userDataService: UserDataService,
    private firestore: AngularFirestore) {
  }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;

        this.getUserData(this.user.uid);
      })
    //this.auth.getUserData(this.user.uid).subscribe(data => console.log(data));
    //console.log(this.userData);



  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }

  getUserData(userUid: string) {
    this.auth.getUserData(this.user.uid).subscribe(data => {
      this.userData = data;
    });
  }

  updateUserData(frm) {
    this.firestore.collection("Users").doc("uZ4mNrKQ3dWyYlUfP554STn1n9h1").update(frm.value).then(res => {}, err => reject(err));
    //add(frm.value).then(res => {}, err => reject(err));
  }
  //getUserData = () =>
  //this.userDataService.getUserData(this.user.uid).subscribe(res => (this.userData = res));



}
