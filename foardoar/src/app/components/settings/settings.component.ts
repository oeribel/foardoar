import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../../service/app-service.service";
import {Setting} from "../../model/setting.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Page} from "../../model/page.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Setting[] = [];
  edit = false;
  editForm = this.formBuilder.group({
    id: [],
    name: [],
    description: [],
    value: []
  })

  constructor(private appService: AppServiceService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.appService.getSettings().subscribe((data: {}) => {
      this.settings = JSON.parse(JSON.stringify(data))['data'];
    })
  }

  opslaan() {
    console.log('opslaan 1');
    const setting = this.createFromForm();
    if(!setting.id){
      this.appService.createSetting(setting).subscribe((data: {}) => {
        this.edit = false;
        this.settings.push(JSON.parse(JSON.stringify(data))['data']);
      })
    }else{
      this.appService.updateSetting(setting).subscribe((data: {}) => {
        this.edit = false;
        this.settings.splice(this.settings.indexOf(setting), 1);
        this.settings.push(JSON.parse(JSON.stringify(data))['data']);
      })
    }
  }

  annuleer() {
    this.edit = false;
  }

  addSetting() {
    this.edit = true;
    this.updateForm({name: "", description: "", value: ""});
  }

  editSetting(setting: Setting) {
    this.edit = true;
    this.updateForm(setting);
  }

  updateForm(setting: Setting) {
    this.editForm.patchValue({
      id: setting.id,
      name: setting.name,
      description: setting.description,
      value: setting.value
    })
  }

  private createFromForm(): Setting {
    return {
      ...new Setting(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      value: this.editForm.get(['value'])!.value
    };
  }
}
