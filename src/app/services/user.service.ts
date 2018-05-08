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

  getUser() {
    return this.http.get<User>(`${environment.serviceUrl}/api/user`);
  }

  updateUser(displayName: string){
    return this.http.post<User>(`${environment.serviceUrl}/api/user`, {
      displayname: displayName
    });
  }

}
