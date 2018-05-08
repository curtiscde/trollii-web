import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { ItemOption } from '../models/item-option';

@Injectable()
export class ItemOptionService {

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get<ItemOption[]>(`${environment.serviceUrl}/api/item-options`);
  }

}
