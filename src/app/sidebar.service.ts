import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  constructor() { }

  opened: boolean;

  close(){
    this.opened = false;
  }

}
