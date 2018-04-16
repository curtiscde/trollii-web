import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { HomeComponent }      from './home/home.component';
import { LoginComponent }  from './login/login.component';
import { ListComponent }  from './list/list.component';
import { ListAddComponent }  from './list-add/list-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'list/:id', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'addlist', component: ListAddComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}