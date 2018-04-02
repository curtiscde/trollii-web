import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { List } from './models/list';


@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  addItem(listid: string, name: string){

    return this.http.post<List>(`${environment.serviceUrl}/api/item`, {
      listid: listid,
      name: name
    }, this.getHttpOptions());

  }

  removeItem(listid: string, itemid: string){
    return this.http.delete<List>(`${environment.serviceUrl}/api/item/${listid}/${itemid}`, this.getHttpOptions());
  }

}