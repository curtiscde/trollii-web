import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/store/user-store.service';

import { ListService } from '../list.service';
import { ListStoreService } from '../list-store.service';

@Injectable()
export class DefaultRedirectService {

  constructor(
    private router: Router,
    private userService: UserService,
    private userStoreService: UserStoreService,
    private listService: ListService,
    private listStoreService: ListStoreService
  ) { }

  redirect(){

    this.userService.getUser()
      .subscribe(user => {

        if (user){
          this.userStoreService.user = user;
        }

        this.listService.getLists()
        .subscribe(lists => {
  
          this.listStoreService.lists = lists;
          this.redirectSwitch();
  
        });

      });

  }

  private redirectSwitch(){
    if (!this.userStoreService.user){
      this.router.navigate(['/profile/update']);
    }
    else if(localStorage.getItem('invite_token')){
      this.router.navigate(['/l/invite']);
    }
    else if (this.listStoreService.lists && this.listStoreService.lists.length){
      this.router.navigate(['/list', this.listStoreService.lists[0]._id]);
    }
    else{
      this.router.navigate(['/addlist']);
    }
  }

}
