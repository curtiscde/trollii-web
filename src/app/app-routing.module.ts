import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { HomeComponent }      from './home/home.component';
import { LoginComponent }  from './components/login/login.component';
import { LoginCallbackComponent }  from './login-callback/login-callback.component';
import { ListComponent }  from './list/list.component';
import { ListAddComponent }  from './list-add/list-add.component';
import { ListInviteAcceptEntryComponent } from './components/list-invite-accept-entry/list-invite-accept-entry.component';
import { ListInviteAcceptComponent } from './components/list-invite-accept/list-invite-accept.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'login-callback', component: LoginCallbackComponent },
  { path: 'list/invite/entry/:inviteid', component: ListInviteAcceptEntryComponent  },

  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },

  { path: 'list/:id', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'addlist', component: ListAddComponent, canActivate: [AuthGuardService] },
  { path: 'l/invite', component: ListInviteAcceptComponent, canActivate: [AuthGuardService] },

  { path: 'profile/update', component: UserProfileUpdateComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}