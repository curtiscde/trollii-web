import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {
  auth0Options = {
    theme: {
      logo: 'http://placehold.it/200x200',
      primaryColor: '#3f51b5'
    },
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid profile email'
      }
    },
    autoclose: true,
    oidcConformant: true,
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor() {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
    
        localStorage.setItem('token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
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