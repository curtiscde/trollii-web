import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';
import { ListInviteService } from '../../services/list-invite.service';

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
    private listInviteService: ListInviteService
  ) { }

  ngOnInit() {
  }

  public acceptInvite(){
    
    let inviteid = localStorage.getItem('invite_token');
    let email = JSON.parse(localStorage.getItem('profile')).email;
    
    this.listInviteService.acceptInvite(inviteid, email).subscribe(data => {

      this.snackBar.open(`List invite accepted`, '', { duration: 1000 });
      this.googleAnalyticsService.emitEvent('List Invite', 'Accepted');
      this.removeInviteToken();

      this.router.navigate(['/list', data.listid]);
    });

  }

  public declineInvite(){
    this.removeInviteToken();
    this.snackBar.open(`List invite declined`, '', { duration: 1000 });
    this.googleAnalyticsService.emitEvent('List Invite', 'Declined');
    this.router.navigate(['/']);
  }

  private removeInviteToken(){
    localStorage.removeItem('invite_token');
  }

}
