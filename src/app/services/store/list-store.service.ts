import { Injectable } from '@angular/core';

import { List } from '../../models/list';
import { Item } from '../../models/item';

@Injectable()
export class ListStoreService {

  constructor() { }

  lists: List[];

  public clear(){
    this.lists = null;
  }

  public getList(listid: String){
    return this.lists.find(list => list._id === listid);
  }

  public updateListItems(listid: String, items: Item[]){
    this.lists.forEach(list => {
      if (list._id === listid){
        list.items.splice(0, list.items.length);
        list.items.push(...items);
      }
    });;
  }

}
