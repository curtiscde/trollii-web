import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public authService: AuthService) {}
  
  ngOnInit() {
    if (!this.authService.isAuthenticated()){
      this.authService.login();
    }
  }

  logout() {
    this.authService.logout();
  }

}
