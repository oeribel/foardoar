import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupAdminComponent} from "./components/group-admin/group-admin.component";
import {GroupViewComponent} from "./components/group-view/group-view.component";
import {PageAdminComponent} from "./components/page-admin/page-admin.component";
import {SettingsComponent} from "./components/settings/settings.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'group/fav',
    pathMatch: 'full'
  }, {
    path: 'admingroup',
    component: GroupAdminComponent
  }, {
    path: 'group/:id',
    component: GroupViewComponent
  },{
    path: 'adminpage',
    component: PageAdminComponent
  },{
    path: 'adminpage/:id',
    component: PageAdminComponent
  },{
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
