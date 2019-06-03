import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
//import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData : Observable<any>;

  registration = []
  constructor(private firestore: AngularFirestore) { }

}
