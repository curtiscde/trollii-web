import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';

@Component({
  selector: 'app-list-invite-accept',
  templateUrl: './list-invite-accept.component.html',
  styleUrls: ['./list-invite-accept.component.css']
})
export class ListInviteAcceptComponent implements OnInit {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService
  ) { }

  ngOnInit() {
  }

  public acceptInvite(){
    this.snackBar.open(`List invite accepted`, '', { duration: 1000 });
    this.googleAnalyticsService.emitEvent('List Invite', 'Accepted');
  }

  public declineInvite(){
    localStorage.removeItem('invite_token');
    this.snackBar.open(`List invite declined`, '', { duration: 1000 });
    this.googleAnalyticsService.emitEvent('List Invite', 'Declined');
    this.router.navigate(['/']);
  }

}
