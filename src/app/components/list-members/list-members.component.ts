import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListService } from '../../list.service';
import { ListStoreService } from '../../services/store/list-store.service';

import { List } from '../../models/list';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css']
})
export class ListMembersComponent implements OnInit {

  list: List;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private listStoreService: ListStoreService
  ) { }

  ngOnInit() {
    if (!this.listStoreService.lists){
      this.listService.getLists()
      .subscribe(lists => {
        this.listStoreService.lists = lists;
        this.list = lists.find(list => list._id === this.route.snapshot.paramMap.get('id'))
      })
    }
    else{
      this.list = this.listStoreService.lists.find(list => list._id === this.route.snapshot.paramMap.get('id'));
    }
  }

}
