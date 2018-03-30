import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

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
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    
  }

  private list: List;

  add(name: string){
    this.listService.addList(name).subscribe(lists => {
      this.snackBar.open(`List "${name}" added`, '', {
        duration: 1000
      });
      this.list = lists.find(l => l.name === name);
      this.router.navigate(['/list', this.list._id]);
    });
  }

}
