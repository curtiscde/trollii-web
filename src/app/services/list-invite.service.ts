import { Injectable } from '@angular/core';

@Injectable()
export class ListInviteService {

  constructor() { }

  sendInvite(listid: String, memberEmail: String){
    console.log({
      'listid': listid,
      'memberEmail': memberEmail
    });
  }

}
