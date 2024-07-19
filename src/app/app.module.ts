import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NewYearModule} from "./modules/new-year/new-year.module";
import {NewYearRoutingModule} from "./modules/new-year/new-year-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ApiService} from "./shared/services/services.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {AuthInterceptor} from "./shared/services/jwt.interceptor";
import { UserDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { DashboardSidebarComponent } from './shared/components/user-dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardUpdateAccountComponent } from './shared/components/user-dashboard/dashboard-update-account/dashboard-update-account.component';
import { DashboardUserInfoComponent } from './shared/components/user-dashboard/dashboard-user-info/dashboard-user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    DashboardSidebarComponent,
    DashboardUpdateAccountComponent,
    DashboardUserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NewYearModule,
    NewYearRoutingModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    ApiService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
