import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';
import { ListInviteService } from '../../services/list-invite.service';
import { ListService } from '../../list.service';
import { ListStoreService } from '../../list-store.service';

@Component({
  selector: 'app-list-invite-accept',
  templateUrl: './list-invite-accept.component.html',
  styleUrls: ['./list-invite-accept.component.css'],
  providers: [
    ListInviteService
  ]
})
export class ListInviteAcceptComponent implements OnInit {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService,
    private listInviteService: ListInviteService,
    private listService: ListService,
    private listStoreService: ListStoreService
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('invite_token')){
      this.router.navigate(['/']);
    }
  }

  public acceptInvite(){

    this.snackBar.open(`Accepting Invite...`, '', { duration: 1000 });
    
    let inviteid = localStorage.getItem('invite_token');
    let email = JSON.parse(localStorage.getItem('profile')).email;
    
    this.listInviteService.acceptInvite(inviteid, email).subscribe(data => {

      this.snackBar.open(`List invite accepted`, '', { duration: 1000 });
      this.googleAnalyticsService.emitEvent('List', 'Invite Accepted');
      this.removeInviteToken();

      this.listService.getLists()
          .subscribe(data => this.listStoreService.lists = data,
            error => {
              this.snackBar.open(`Something went wrong`, '', { duration: 1000 });
              this.googleAnalyticsService.emitEvent('Error', 'Invite Accept');
            });

      this.router.navigate(['/list', data.listid]);
    });

  }

  public declineInvite(){
    this.removeInviteToken();
    this.snackBar.open(`List invite declined`, '', { duration: 1000 });
    this.googleAnalyticsService.emitEvent('List', 'Invite Declined');
    this.router.navigate(['/']);
  }

  private removeInviteToken(){
    localStorage.removeItem('invite_token');
  }

}
