import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import 'hammerjs';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AuthService } from './auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListAddComponent } from './list-add/list-add.component';
import { ListComponent } from './list/list.component';
import { ListService } from './list.service';
import { ListStoreService } from './services/store/list-store.service';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/store/user-store.service';
import { AuthGuardService } from './auth-guard.service';
import { DefaultRedirectService } from './services/default-redirect.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { ListInviteComponent } from './list-invite/list-invite.component';
import { ListInviteAcceptEntryComponent } from './components/list-invite-accept-entry/list-invite-accept-entry.component';
import { ListInviteAcceptComponent } from './components/list-invite-accept/list-invite-accept.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ItemComponent } from './components/item/item.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { ListToolbarComponent } from './components/list-toolbar/list-toolbar.component';
import { ListMembersComponent } from './components/list-members/list-members.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    ListAddComponent,
    ListComponent,
    LoginCallbackComponent,
    ListInviteComponent,
    ListInviteAcceptEntryComponent,
    ListInviteAcceptComponent,
    ToolbarComponent,
    LoadingSpinnerComponent,
    ItemComponent,
    UserProfileUpdateComponent,
    ListToolbarComponent,
    ListMembersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    AppRoutingModule,

    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ListService,
    ListStoreService,
    DefaultRedirectService,
    UserService,
    UserStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ListInviteComponent
  ]
})
export class AppModule { }
