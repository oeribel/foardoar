import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../../service/app-service.service";
import {FormBuilder} from "@angular/forms";
import {Group} from "../../model/group.model";

@Component({
  selector: 'app-group-admin',
  templateUrl: './group-admin.component.html',
  styleUrls: ['./group-admin.component.css']
})
export class GroupAdminComponent implements OnInit {
  groups: Group[] = [];
  oudegroup?: Group;
  edit = false;
  groupId?: number;
  editForm = this.formBuilder.group({
    id: [],
    name: [],
    ordering: [],
    parentgroup: [],
    icon: []
  })

  constructor(private appService: AppServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.appService.getAllGroups().subscribe((data: {}) => {
      this.groups = JSON.parse(JSON.stringify(data))['data'];
    })
  }

  editGroup(group: Group) {
    this.oudegroup = group;
    this.groupId = group.parentgroup;
    this.edit = true;
    this.updateForm(group);
  }

  removeGroup(group: Group) {
    this.appService.deleteGroup(group).subscribe((data: {}) => {
      this.groups.splice(this.groups.indexOf(group), 1);
    })
  }

  annuleer() {
    this.oudegroup = undefined;
    this.edit = false;
  }

  addGroup() {
    this.oudegroup = undefined;
    this.edit = true;
    this.updateForm({name: "", icon: "bi bi-"});
  }

  opslaan() {
    const group = this.createFromForm();
    if (!group.id) {
      this.appService.createGroups(group).subscribe((data: {}) => {
        this.edit = false;
        this.groups.push(JSON.parse(JSON.stringify(data))['data']);
      })
    } else {
      this.appService.updateGroups(group).subscribe((data: {}) => {
        this.edit = false;
        this.groups.splice(this.groups.indexOf(group), 1);
        this.groups.push(JSON.parse(JSON.stringify(data))['data']);
      })
    }
  }

  updateForm(group: Group) {
    this.editForm.patchValue({
      id: group.id,
      name: group.name,
      ordering: group.ordering,
      parentgroup: group.parentgroup,
      icon: group.icon
    })
  }

  private createFromForm(): Group {
    return {
      ...new Group(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      ordering: this.editForm.get(['ordering'])!.value,
      parentgroup: this.editForm.get(['parentgroup'])!.value,
      icon: this.editForm!.get(['icon'])!.value
    };
  }
}
