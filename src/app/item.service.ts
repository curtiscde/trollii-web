import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { List } from './models/list';


@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  addItem(listid: string, name: string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.post<List>('http://localhost:8080/api/item', {
      listid: listid,
      name: name
    }, httpOptions);

  }

}
