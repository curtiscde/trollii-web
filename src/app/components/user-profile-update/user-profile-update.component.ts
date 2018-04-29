import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';
import { UserService } from '../../services/user.service';

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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
      .subscribe(user => {
        this.displayName = user.displayname;
      }, () => {
        this.googleAnalyticsService.emitEvent('Error', 'User Profile Get');

        if (localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile')).nickname){
          this.displayName = JSON.parse(localStorage.getItem('profile')).nickname;
        }

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
