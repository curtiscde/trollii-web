import { Injectable } from '@angular/core';

import { List } from './models/list';

@Injectable()
export class ListStoreService {

  constructor() { }

  lists: List[];

  public clear(){
    this.lists = null;
  }

}
