import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  constructor() { }

  opened: boolean;

  toggle(){
    this.opened = !this.opened;
  }

  close(){
    this.opened = false;
  }

}
