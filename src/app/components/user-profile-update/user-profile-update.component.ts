import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';
import { UserService } from '../../services/user.service';

import { UserStoreService } from '../../services/store/user-store.service';

import { DefaultRedirectService } from '../../services/default-redirect.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css'],
  providers: [ UserService ]
})
export class UserProfileUpdateComponent implements OnInit {

  firstUpdate: boolean;
  displayName: string;

  constructor(
    private snackBar: MatSnackBar,    
    private googleAnalyticsService: GoogleAnalyticsService,
    private userService: UserService,
    private userStoreService: UserStoreService,
    private defaultRedirectService: DefaultRedirectService
  ) { }

  ngOnInit() {
    this.firstUpdate = false;
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
      .subscribe(user => {

        this.firstUpdate = !user;

        if (user){
          this.userStoreService.user = user;
          this.displayName = this.userStoreService.user.displayname;
        }
        else if (localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile')).nickname){
          this.displayName = JSON.parse(localStorage.getItem('profile')).nickname;
        }
        
      }, () => {
        this.googleAnalyticsService.emitEvent('Error', 'User Profile Get');
      });
  }

  update(){
    this.userService.updateUser(this.displayName)
      .subscribe(user => {

        this.googleAnalyticsService.emitEvent('User Profile', 'Update');

        if (this.firstUpdate){
          this.snackBar.open(`Welcome ${this.displayName}!`, '', { duration: 1000 });
          this.defaultRedirectService.redirect();
        }
        else{
          this.snackBar.open(`Profile Updated`, '', { duration: 1000 });
        }

      }, () => {
        this.snackBar.open(`Something went wrong`, '', { duration: 1000 });
        this.googleAnalyticsService.emitEvent('Error', 'User Profile Update');
      });
  }

}
