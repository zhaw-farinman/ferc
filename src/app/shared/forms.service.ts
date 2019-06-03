import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class FormsService {
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    postcode: new FormControl(''),
    phonenumber: new FormControl(''),
    completed: new FormControl(false)
  })
  constructor() { }
}
