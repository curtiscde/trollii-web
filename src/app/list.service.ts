import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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

    return this.http.get<List[]>('http://localhost:8080/api/list', httpOptions);
  }

}
