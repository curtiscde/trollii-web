import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-invite-accept',
  templateUrl: './list-invite-accept.component.html',
  styleUrls: ['./list-invite-accept.component.css']
})
export class ListInviteAcceptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public acceptInvite(){
    console.log('accept invite..');
  }

  public declineInvite(){
    console.log('decline invite..');
  }

}
