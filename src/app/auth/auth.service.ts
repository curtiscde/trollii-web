import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { tokenNotExpired } from 'angular2-jwt';
import { Auth0Lock } from 'auth0-lock';

import { environment } from '../../environments/environment';

import { DefaultRedirectService } from '../services/default-redirect.service';
import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/store/user-store.service';
import { ListStoreService } from '../services/store/list-store.service';

@Injectable()
export class AuthService {

  cachedRequests: Array<HttpRequest<any>> = [];

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
    private http: HttpClient,
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
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('token_exp', expiresAt);

        this.retryFailedRequests();

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
    localStorage.removeItem('token_exp');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return tokenNotExpired();
  }

  collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  retryFailedRequests(): void {
    this.cachedRequests.forEach( request => {
      this.http.request(request).subscribe(a => console.log(a));
    });
    this.cachedRequests = [];
  }
}