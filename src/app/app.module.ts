import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';

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
import { SidebarComponent } from './sidebar/sidebar.component';

import { AuthService } from './auth.service';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListAddComponent } from './list-add/list-add.component';
import { ListComponent } from './list/list.component';
import { ListService } from './list.service';
import { ListStoreService } from './list-store.service';
import { AuthGuardService } from './auth-guard.service';
import { DefaultRedirectService } from './services/default-redirect.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { ListInviteComponent } from './list-invite/list-invite.component';
import { ListInviteAcceptEntryComponent } from './components/list-invite-accept-entry/list-invite-accept-entry.component';
import { ListInviteAcceptComponent } from './components/list-invite-accept/list-invite-accept.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ItemComponent } from './components/item/item.component';


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
    ItemComponent
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

    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ListService,
    ListStoreService,
    DefaultRedirectService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ListInviteComponent
  ]
})
export class AppModule { }
