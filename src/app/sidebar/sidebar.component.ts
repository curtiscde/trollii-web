import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { List } from '../models/list';

import { AuthService } from '../auth.service';
import { ListService } from '../list.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    ListService
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private listService: ListService,
    private sidebarService: SidebarService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isAuthenticated()){
      this.getLists();
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  lists: List[];

  getLists() {
    this.listService.getLists()
      .subscribe(data => this.lists = data);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
