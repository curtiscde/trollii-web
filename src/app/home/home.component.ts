import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { DefaultRedirectService } from '../services/default-redirect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DefaultRedirectService]
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private defaultRedirectService: DefaultRedirectService
  ) {}

  ngOnInit() {
    this.redirect();
  }

  redirect(){
    this.defaultRedirectService.redirect();
  }

}
