import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { environment } from '../../../environments/environment';

import { List } from '../../models/list';

import { AuthService } from '../../auth.service';
import { ListService } from '../../list.service';
import { ListStoreService } from '../../services/store/list-store.service';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private listService: ListService,
    private sidebarService: SidebarService,
    private router: Router,
    private listStoreService: ListStoreService,
  ) { }

  ngOnInit() {
    this.versionNo = environment.version;
    if (this.isAuthenticated()){
      this.getLists();
    }
  }

  public versionNo: String;

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  lists(){
   return this.listStoreService.lists; 
  };

  getLists() {
    this.listService.getLists()
      .subscribe(data => this.listStoreService.lists = data);
  }

  getTopListEmojis(list: List){
    return list.items.filter(item => !!item.emoji).slice(0, 3);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
