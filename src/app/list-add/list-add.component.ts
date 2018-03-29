import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ListService } from '../list.service';

import { List } from '../models/list';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css'],
  providers: [ListService]
})
export class ListAddComponent implements OnInit {

  constructor(
    private listService: ListService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  private list: List;

  add(name: string){
    this.listService.addList(name).subscribe(lists => {
      this.list = lists.find(l => l.name === name);
      this.router.navigate(['/list', this.list._id]);
    });
  }

}
