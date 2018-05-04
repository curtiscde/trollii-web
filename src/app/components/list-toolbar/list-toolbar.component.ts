import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar, MatDialog } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';
import { ListService } from '../../list.service';
import { ListStoreService } from '../../list-store.service';
import { ListInviteService } from '../../services/list-invite.service';

import { ListInviteComponent } from '../../list-invite/list-invite.component';

import { List } from '../../models/list';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.css']
})
export class ListToolbarComponent implements OnInit {
  @Input() list: List;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService,
    private listService: ListService,
    private listStoreService: ListStoreService,
    private listInviteService: ListInviteService
  ) { }

  ngOnInit() {
  }

  itemCount(){
    return this.list.items.length;
  }

  memberCount(){
    return this.list.members.length;
  }

  inviteMembers(){
    let inviteMemberDialog = this.dialog.open(ListInviteComponent, {
      width: '250px',
      data: { listid: this.list._id, memberemail: '' }
    });

    inviteMemberDialog.afterClosed().subscribe(memberEmail => {
      if (memberEmail){
        this.snackBar.open(`Sending invite...`, '', { duration: 2000 });
        this.listInviteService.sendInvite(this.list._id, memberEmail)
          .subscribe(data => {
            this.snackBar.open(`Invite sent to ${memberEmail}`, '', { duration: 2000 });
            this.googleAnalyticsService.emitEvent('List', 'Invite Sent');
          });
      }
    });
  }

  removeList() {
    this.listService.deleteList(this.list)
      .subscribe(lists => {
        this.snackBar.open(`List "${this.list.name}" deleted`, '', {
          duration: 1000
        });
        this.googleAnalyticsService.emitEvent('List', 'Remove');
        this.listStoreService.lists = lists;
        this.router.navigate(['']);
      });
  }

  leaveList() {
    this.listService.leaveList(this.list)
      .subscribe(data => {
        this.listService.getLists();
        this.snackBar.open(`Left "${this.list.name}" list`, '', {
          duration: 1000
        });
        this.googleAnalyticsService.emitEvent('List', 'Leave');
        this.router.navigate(['']);
        this.listService.getLists()
          .subscribe(data => this.listStoreService.lists = data);
      })
  }

}
