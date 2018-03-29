import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { List } from './models/list';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }

  getLists() {
    return this.http.get<List[]>('http://localhost:8080/api/list');
  }

}
