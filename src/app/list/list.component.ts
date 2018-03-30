import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';
import { ListService } from '../list.service';

import { List } from '../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    ListService
  ]
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
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
    console.log(`remove list ${this.list._id}`);
    this.listService.deleteList(this.list)
      .subscribe(data => {
        this.snackBar.open(`List "${this.list.name}" deleted`, '', {
          duration: 1000
        });
        this.router.navigate(['']);
      });
  }

}
