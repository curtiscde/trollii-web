import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { List } from './models/list';
import { ItemResponse } from './models/item-response';


@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  addItem(listid: string, name: string){

    return this.http.post<ItemResponse>(`${environment.serviceUrl}/api/item`, {
      listid: listid,
      name: name
    });

  }

  removeItem(listid: string, itemid: string){
    return this.http.delete<ItemResponse>(`${environment.serviceUrl}/api/item/${listid}/${itemid}`);
  }

}
