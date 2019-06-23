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
  }
  //führt zu der Login-Seite
  login() {
    this.router.navigate(['/login']);
  }
  //Loggt den Benutzer aus
  logout() {
    this.auth.logout();
  }
 //führt zu der Anmelde-Seite
  register() {
    this.router.navigate(['/register']);
  }
  //erhält die Benutzerdaten
  getUserData(userUid: string) {
    this.auth.getUserData(this.user.uid).subscribe(data => {
      this.userData = data;
    });
  }
  //aktualisiert die Kundendaten
  updateUserData(frm) {
    this.firestore.collection("Users").doc(frm.value.uid).update(frm.value).then(res => {}, err => reject(err));
    this.startProcess(frm.value.uid);
    //add(frm.value).then(res => {}, err => reject(err));
  }

  //sendet einen REST-Request an das Workflowmanagement Camunda und startet einen neuen Prozess
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
