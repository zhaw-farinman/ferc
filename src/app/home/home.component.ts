import { Component, OnInit } from '@angular/core';
import { AuthService, userData } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { reject } from 'q';
import { HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  postData: {};
  user: firebase.User;
  userData: any;
  readonly ROOT_URL = 'http://localhost:8080/rest/process-definition/key/redcross/start';
  constructor(private auth: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private http: HttpClient) {
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
    this.firestore.collection("Users").doc(frm.value.uid).update(frm.value).then(res => {}, err => reject(err));
    this.startProcess(frm.value.uid);
    //add(frm.value).then(res => {}, err => reject(err));
  }

  startProcess(userUid) {
    this.postData = {
      "variables": {
        "userId": {
          "value": userUid,
          "type": "String"
        }
      },
      "startInstructions": [
        {
          "type": "startBeforeActivity",
          "activityId": "StartEvent"
        }
      ],
      "businessKey": ""
    }
    this.http.post(this.ROOT_URL, this.postData).toPromise().then(data => {
      console.log(data);
    })
  }



}
