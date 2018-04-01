import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';
import { ListService } from '../list.service';
import { ItemService } from '../item.service';

import { List } from '../models/list';
import { Item } from '../models/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    ListService,
    ItemService
  ]
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
    private itemService: ItemService,
    public snackBar: MatSnackBar
  ) { }

  list: List;

  ngOnInit() {

    this.getList();

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

  removeList() {
    this.listService.deleteList(this.list)
      .subscribe(data => {
        this.snackBar.open(`List "${this.list.name}" deleted`, '', {
          duration: 1000
        });
        this.router.navigate(['']);
      });
  }

  addItem(name: string){
    this.itemService.addItem(this.list._id, name)
      .subscribe(data => {
        this.snackBar.open(`Item "${name}" added`, '', {
          duration: 1000
        });
        this.list = data;
      });
  }

  removeItem(item: Item){
    this.itemService.removeItem(this.list._id, item._id)
      .subscribe(list => {
        this.snackBar.open(`Item "${item.name}" removed`, '', {
          duration: 1000
        });
        this.list = list;
      });
  }

}
