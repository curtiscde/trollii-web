import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  getUser() {
    return this.http.get<User>(`${environment.serviceUrl}/api/user`, this.getHttpOptions());
  }

  updateUser(displayName: string){
    return this.http.post<User>(`${environment.serviceUrl}/api/user`, {
      displayname: displayName
    }, this.getHttpOptions());
  }

}
