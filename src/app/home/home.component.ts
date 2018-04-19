import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';
import { ListService } from '../list.service';

import { List } from '../models/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ListService]
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private listService: ListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.redirect();
  }

  list: List;

  redirect(){

    if(localStorage.getItem('invite_token')){
      this.router.navigate(['/list/invite']);
    }
    else{

      this.getFirstList(() => {
        if (this.list){
          this.router.navigate(['/list', this.list._id]);
        }
        else{
          this.router.navigate(['/addlist']);
        }
      });

    } 
  }

  getFirstList(cb) {
    this.listService.getLists()
      .subscribe(data => {
        this.list = data[0];
        cb();
      })
  }

}
