import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../../service/app-service.service";
import {Setting} from "../../model/setting.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Setting[] = [];

  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {
    this.appService.getSettings().subscribe((data: {}) => {
      this.settings = JSON.parse(JSON.stringify(data))['data'];
    })
  }

  addSetting() {

  }

  editSetting(setting: Setting) {

  }
}
