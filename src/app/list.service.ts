import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { List } from './models/list';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  getLists() {
    return this.http.get<List[]>(`${environment.serviceUrl}/api/list`, this.getHttpOptions());
  }

  addList(name: String){

    return this.http.post<List[]>(`${environment.serviceUrl}/api/list`, {
      name: name
    }, this.getHttpOptions());

  }

  deleteList(list: List){
    return this.http.delete<List[]>(`${environment.serviceUrl}/api/list/${list._id}`, this.getHttpOptions());
  }

}
