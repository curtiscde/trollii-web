import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { List } from './models/list';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }

  getLists() {
    return this.http.get<List[]>(`${environment.serviceUrl}/api/list`);
  }

  addList(name: String){
    return this.http.post<List[]>(`${environment.serviceUrl}/api/list`, {
      name: name
    });

  }

  deleteList(list: List){
    return this.http.delete<List[]>(`${environment.serviceUrl}/api/list/${list._id}`);
  }

  leaveList(list: List){
    return this.http.delete<any>(`${environment.serviceUrl}/api/list/${list._id}/member`);
  }

}
