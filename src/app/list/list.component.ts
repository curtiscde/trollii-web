import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { ListService } from '../list.service';
import { ListStoreService } from '../services/store/list-store.service';
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
    ItemService,
    ItemOptionService
  ]
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService,
    private listService: ListService,
    private listStoreService: ListStoreService,
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
    let listId = this.route.snapshot.paramMap.get('id');
    if (this.listStoreService.lists){
      this.list = this.listStoreService.getList(listId);
    }
    else{
      this.listService.getLists()
      .subscribe(lists => {
        this.listStoreService.lists = lists
        this.list = this.listStoreService.getList(listId);
      });
    }
  }

  itemName: string;

  addItem(name: string){
    this.itemService.addItem(this.list._id, name)
      .subscribe(list => {
        this.listStoreService.updateListItems(this.list._id, list.items);
        this.snackBar.open(`Item "${name}" added`, '', { duration: 1000 });
        this.googleAnalyticsService.emitEvent('Item', 'Add');
        this.list = list;
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
