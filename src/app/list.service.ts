import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { List } from './models/list';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }

  getLists() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.get<List[]>(`${environment.serviceUrl}/api/list`, httpOptions);
  }

  addList(name: String){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.post<List[]>(`${environment.serviceUrl}/api/list`, {
      name: name
    }, httpOptions);
  }

  deleteList(list: List){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.delete<List[]>(`${environment.serviceUrl}/api/list/${list._id}`, httpOptions);
  }

}
