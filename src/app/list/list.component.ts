import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar, MatDialog } from '@angular/material';

import { AuthService } from '../auth.service';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { ListService } from '../list.service';
import { ListStoreService } from '../list-store.service';
import { ListInviteService } from '../services/list-invite.service';
import { ItemService } from '../item.service';
import { ItemOptionService } from '../services/item-option.service';
import { SidebarService } from '../sidebar.service';

import { ListInviteComponent } from '../list-invite/list-invite.component';

import { List } from '../models/list';
import { Item } from '../models/item';
import { ItemOption } from '../models/item-option';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    GoogleAnalyticsService,
    ListService,
    ListInviteService,
    ItemService,
    ItemOptionService
  ]
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private googleAnalyticsService: GoogleAnalyticsService,
    private listService: ListService,
    private listStoreService: ListStoreService,
    private listInviteService: ListInviteService,
    private itemService: ItemService,
    private itemOptionService: ItemOptionService,
    private sidebarService: SidebarService    
  ) { }

  list: List;
  itemOptions: ItemOption[];

  ngOnInit() {

    this.getList();
    this.getItemOptions();

    this.route.params.subscribe( params => {
      this.getList();
    });

  }

  getList() {
    this.listService.getLists()
      .subscribe(data => {
        this.list = data.find(list => list._id === this.route.snapshot.paramMap.get('id'))
      })
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

  itemName: string;

  addItem(name: string){
    this.itemService.addItem(this.list._id, name)
      .subscribe(data => {
        this.snackBar.open(`Item "${name}" added`, '', { duration: 1000 });
        this.googleAnalyticsService.emitEvent('Item', 'Add');
        this.list = data;
      }, error => {
        this.googleAnalyticsService.emitEvent('Error', 'Item Add', error.error.error);
        let errorMessage = (error.error.code === 3) ? `Item "${name}" already exists` : `Something went wrong`;
        this.snackBar.open(errorMessage, '', { duration: 1000 });
      });
  }

  listChange(event: List) {
    this.list = event;
  }

  getItemOptions(){
    this.itemOptionService.getItems()
      .subscribe(itemOptions => {
        this.itemOptions = itemOptions;
      });
  }

  filteredItemOptions(){
    return this.filterItemOptions(this.itemOptions, this.itemName);
  }

  filterItemOptions(itemOptions: ItemOption[], itemName: string){
    return itemOptions ? itemOptions.filter(itemOption => itemName && itemOption.name.toLowerCase().indexOf(itemName.toLowerCase())>=0) : [];
  }

}
