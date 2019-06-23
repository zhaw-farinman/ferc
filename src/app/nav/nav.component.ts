import { Component, OnInit } from '@angular/core';
import { AuthService, userData } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: firebase.User;
  
  appTitle: string = 'Red Cross';
  constructor(private auth: AuthService,
    private router: Router, ) { }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;

      })
  }

  logout() {
    this.auth.logout();
  }
}