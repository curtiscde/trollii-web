import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';
import { UserService } from '../../services/user.service';

import { UserStoreService } from '../../services/store/user-store.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css'],
  providers: [ UserService ]
})
export class UserProfileUpdateComponent implements OnInit {

  displayName: string;

  constructor(
    private snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService,
    private userService: UserService,
    private userStoreService: UserStoreService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
      .subscribe(user => {

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
        this.snackBar.open(`Profile Updated`, '', { duration: 1000 });
        this.googleAnalyticsService.emitEvent('User Profile', 'Update');
      }, () => {
        this.snackBar.open(`Something went wrong`, '', { duration: 1000 });
        this.googleAnalyticsService.emitEvent('Error', 'User Profile Update');
      });
  }

}
