import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { environment } from '../environments/environment';
import { GoogleAnalyticsService } from './google-analytics.service';
import { AuthService } from './auth.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    GoogleAnalyticsService,
    SidebarService
  ]
})
export class AppComponent {
  title = 'app';

  constructor(
    private router: Router,
    private googleAnalyticsService: GoogleAnalyticsService,
    private authService: AuthService,
    public sidebarService: SidebarService
  ) {
    this.appendGaTrackingCode();
  }
  
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

  private appendGaTrackingCode() {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '` + environment.googleAnalyticsKey + `', 'auto');
      `;
      document.head.appendChild(script);
    } catch (ex) {
     console.error('Error appending google analytics');
     console.error(ex);
    }
  }

}
