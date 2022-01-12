import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { GroupAdminComponent } from './components/group-admin/group-admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GroupViewComponent } from './components/group-view/group-view.component';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GroupAdminComponent,
    GroupViewComponent,
    PageAdminComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
