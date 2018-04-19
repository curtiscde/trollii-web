import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-list-invite-accept-entry',
  templateUrl: './list-invite-accept-entry.component.html',
  styleUrls: ['./list-invite-accept-entry.component.css']
})
export class ListInviteAcceptEntryComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.storeInviteToken();
    this.redirect();
  }

  storeInviteToken() {
    let inviteid = this.route.snapshot.paramMap.get('inviteid');
    localStorage.setItem('invite_token', inviteid);
  }

  redirect(){
    if (this.authService.isAuthenticated()){
      this.router.navigate(['/l/invite']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

}
