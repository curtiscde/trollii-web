import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
      audience: environment.auth0.audience,
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

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }

        console.log(authResult);
    
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.router.navigate(['/']);
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