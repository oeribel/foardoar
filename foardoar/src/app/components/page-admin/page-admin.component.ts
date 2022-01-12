import { Component, OnInit } from '@angular/core';
import {Page} from "../../model/page.model";
import {Group} from "../../model/group.model";
import {AppServiceService} from "../../service/app-service.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {
  pages: Page[] = [];
  groups: Group[] = [];
  oldPage?: Page;
  edit = false;
  groupId?: number;
  editForm = this.formBuilder.group({
    id: [],
    name: [],
    theurl: [],
    screenshot: [],
    ordering: [],
    parentgroup: [],
    favorite: []
  })

  constructor(private appService: AppServiceService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const groupId = params['id'];
      if (groupId && groupId !== 'fav') {
        this.appService.getPagesByGroupId(groupId).subscribe((data: {}) => {
          this.pages = JSON.parse(JSON.stringify(data))['data'];
        })
      } else {
        this.appService.getPages().subscribe((data: {}) => {
          this.pages = JSON.parse(JSON.stringify(data))['data'];
        })
      }
    });
    this.appService.getAllGroups().subscribe((data: {}) => {
      this.groups = JSON.parse(JSON.stringify(data))['data'];
    })
  }

  editPage(page: Page) {
    this.oldPage = page;
    this.groupId = page.parentgroup;
    this.edit = true;
    this.updateForm(page);
  }

  removePage(page: Page) {
    this.appService.deletePage(page).subscribe((data: {}) => {
      this.pages.splice(this.pages.indexOf(page), 1);
    })
  }

  opslaan() {
    console.log('opslaan 1');
    const page = this.createFromForm();
    if(!page.id){
      this.appService.createPage(page).subscribe((data: {}) => {
        this.edit = false;
        this.pages.push(JSON.parse(JSON.stringify(data))['data']);
      })
    }else{
      this.appService.updatePage(page).subscribe((data: {}) => {
        this.edit = false;
        this.pages.splice(this.pages.indexOf(page), 1);
        this.pages.push(JSON.parse(JSON.stringify(data))['data']);
      })
    }
  }

  annuleer() {
    this.oldPage = undefined;
    this.edit = false;
  }

  addPage() {
    this.oldPage = undefined;
    this.edit = true;
    this.updateForm({name: "", theurl: "", parentgroup: 1});
  }

  updateForm(page: Page) {
    this.editForm.patchValue({
      id: page.id,
      name: page.name,
      theurl: page.theurl,
      screenshot: page.screenshot,
      ordering: page.ordering,
      parentgroup: page.parentgroup,
      favorite: page.favorite
    })
  }

  private createFromForm(): Page {
    return {
      ...new Page(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      theurl: this.editForm.get(['theurl'])!.value,
      screenshot: this.editForm.get(['screenshot'])!.value,
      ordering: this.editForm.get(['ordering'])!.value,
      parentgroup: this.editForm.get(['parentgroup'])!.value,
      favorite: this.editForm.get(['favorite'])!.value
    };
  }

  getShortenedUrl(page: Page) {
    if (page.theurl !== undefined && page.theurl?.length > 100) {
      return page.theurl.slice(0, 100) + ' ...';
    }
    return page.theurl;
  }

  screenshot(page: Page) {
    this.appService.captureWebpage(page).subscribe((data: {}) => {
    })
  }
}
