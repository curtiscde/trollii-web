import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../google-analytics.service';
import { ListService } from '../list.service';
import { ListStoreService } from '../list-store.service';

import { List } from '../models/list';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {

  constructor(
    private listService: ListService,
    private router: Router,
    public snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService,
    private listStoreService: ListStoreService
  ) { }

  ngOnInit() {
    
  }

  private list: List;

  add(name: string){
    this.listService.addList(name).subscribe(lists => {
      this.snackBar.open(`List "${name}" added`, '', { duration: 1000 });
      this.googleAnalyticsService.emitEvent('List', 'Add');
      this.list = lists.find(l => l.name === name);
      this.router.navigate(['/list', this.list._id]);
      this.listStoreService.lists = lists;
    });
  }

}
