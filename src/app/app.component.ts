import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from './auth.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarService]
})
export class AppComponent {
  title = 'app';

  constructor(
    private router: Router,
    private authService: AuthService,
    public sidebarService: SidebarService
  ) {}
  
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.sidebarService.close();
    });
  }

  sidebarOpened(){
    return this.sidebarService.opened;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
