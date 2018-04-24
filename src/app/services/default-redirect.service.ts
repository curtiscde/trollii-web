import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { ListService } from '../list.service';

@Injectable()
export class DefaultRedirectService {

  constructor(
    private router: Router,
    private listService: ListService
  ) { }

  redirect(){

    this.listService.getLists()
      .subscribe(lists => {

        if(localStorage.getItem('invite_token')){
          this.router.navigate(['/l/invite']);
        }
        else if (lists && lists.length){
          this.router.navigate(['/list', lists[0]._id]);
        }
        else{
          this.router.navigate(['/addlist']);
        }

      });

  }

}
