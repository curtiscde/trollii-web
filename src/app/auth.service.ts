import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import { DefaultRedirectService } from './services/default-redirect.service';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/store/user-store.service';
import { ListStoreService } from './list-store.service';

@Injectable()
export class AuthService {
  auth0Options = {
    theme: {
      logo: `${environment.webUrl}/assets/images/icons/icon-128x128.png`,
      primaryColor: '#00acc1'
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
    private defaultRedirectService: DefaultRedirectService,
    private userService: UserService,
    private userStoreService: UserStoreService,
    private listStoreService: ListStoreService
  ) {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        this.defaultRedirectService.redirect();

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
    this.listStoreService.clear();
    this.userStoreService.clear();
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return tokenNotExpired();
  }
}