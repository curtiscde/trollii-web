import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ListInviteService {

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  sendInvite(listid: String, memberEmail: String){
    return this.http.post<any>(`${environment.serviceUrl}/api/list-invite`, {
      listid: listid,
      email: memberEmail
    }, this.getHttpOptions());
  }

  acceptInvite(inviteid: String, email: String){
    return this.http.post<any>(`${environment.serviceUrl}/api/list-invite/accept`, {
      inviteid: inviteid,
      email: email
    }, this.getHttpOptions());
  }

}
