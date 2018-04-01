import { Component } from '@angular/core';

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
    private authService: AuthService,
    public sidebarService: SidebarService
  ) {}
  
  ngOnInit() {
  }

  sidebarOpened(){
    return this.sidebarService.opened;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
