import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './home/home.component';
import { LoginComponent }  from './login/login.component';
import { ListComponent }  from './list/list.component';
import { ListAddComponent }  from './list-add/list-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list/:id', component: ListComponent },
  { path: 'addlist', component: ListAddComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}