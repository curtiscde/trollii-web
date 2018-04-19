import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import { ListService } from './list.service';
import { ListStoreService } from './list-store.service';

@Injectable()
export class AuthService {
  auth0Options = {
    theme: {
      logo: `${environment.webUrl}/assets/images/icon.png`,
      primaryColor: '#3f51b5'
    },
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: environment.auth0.audience,
      params: {
        scope: 'openid profile email'
      }
    },
    autoclose: true,
    oidcConformant: true,
    languageDictionary:{
      title: 'Trollii'
    }
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(
    private router: Router,
    private listService: ListService,
    private listStoreService: ListStoreService
  ) {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        this.listService.getLists().subscribe(lists => {
          
          this.listStoreService.lists = lists;

          if(localStorage.getItem('invite_token')){
            this.router.navigate(['/list/invite']);
          }
          else if (this.listStoreService.lists.length){
            let firstListId = this.listStoreService.lists[0]._id;
            this.router.navigate(['/list', firstListId]);
          }
          else{
            this.router.navigate(['/addlist']);
          }

        });



      });
    });

    this.lock.on('authorization_error', error => {
      console.log('something went wrong', error);
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return tokenNotExpired();
  }
}