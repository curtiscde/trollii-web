import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { ItemOption } from '../models/item-option';

@Injectable()
export class ItemOptionService {

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  getItems(){
    return this.http.get<ItemOption[]>(`${environment.serviceUrl}/api/item-options`, this.getHttpOptions());
  }

}
