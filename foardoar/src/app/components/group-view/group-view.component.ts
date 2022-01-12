import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../model/group.model";
import {Page} from "../../model/page.model";
import {AppServiceService} from "../../service/app-service.service";
import {ActivatedRoute} from "@angular/router";
import {Setting} from "../../model/setting.model";

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {
  settings: Setting[] = [];
  group?: Group;
  parent?: Group;
  groups?: Group[];
  pages: Page[] = [];
  ip = '';
  groupId?: any

  constructor(private appService: AppServiceService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.groupId = params['id'];
      if(this.groupId){
        if(this.groupId === 'fav'){
          console.log(this.groupId)
          this.loadFavorites('favorites');
        }else if(this.groupId === 'overig'){
          console.log(this.groupId)
          this.loadFavorites('overig');
        }else{
          this.loadGroup(this.groupId);
        }
      }else{
        this.appService.getSubGroups(0).subscribe((data: {}) => {
          const groups = JSON.parse(JSON.stringify(data))['data'];
          let lowestOrderNr = null;
            for(let group of groups){
              if(lowestOrderNr === null || group.order < lowestOrderNr.order){
                lowestOrderNr = group;
              }
            }
            this.loadGroup(lowestOrderNr.id);
        })
      }
    });
    this.appService.getSettings().subscribe((data: {}) => {
      this.settings = JSON.parse(JSON.stringify(data))['data'];
    })
  }

  loadGroup(groupId: number) {
    //get details of group
    this.appService.getGroupById(groupId).subscribe((data: {}) => {
      this.group = JSON.parse(JSON.stringify(data))['data'][0];
      this.parent = undefined;
      // get parent
      if(this.group?.parentgroup){
        this.appService.getGroupById(this.group?.parentgroup).subscribe((data: {}) => {
          this.parent = JSON.parse(JSON.stringify(data))['data'][0];
        })
      }
    })
    //get subgroups
    this.appService.getSubGroups(groupId).subscribe((data: {}) => {
      this.groups = JSON.parse(JSON.stringify(data))['data'];
    })
    //get pages
    this.appService.getPagesByGroupId(groupId).subscribe((data: {}) => {
      this.pages = JSON.parse(JSON.stringify(data))['data'];
      for (let page of this.pages) {
        this.appService.getScreenshotByPageId(page.id).subscribe((data: {}) => {
          const screenshot = JSON.parse(JSON.stringify(data))['data'];
          // console.log(screenshot);
          page.screenshot = screenshot;
        })
      }
    })
    // this.getIp();
  }

  private loadFavorites(namedPage: string) {
    //get pages
    this.appService.getNamedPage(namedPage).subscribe((data: {}) => {
      this.pages = JSON.parse(JSON.stringify(data))['data'];
      for (let page of this.pages) {
        this.appService.getScreenshotByPageId(page.id).subscribe((data: {}) => {
          const screenshot = JSON.parse(JSON.stringify(data))['data'];
          page.screenshot = screenshot;
        })
      }
    })
  }

  getScreenshot(page: Page) {
    return "http://" + this.ip  + ":3080/images/" + page.id + ".png";
  }


  getLocation() : string {
    if(window.location.host.endsWith('4200'))
      return window.location.host.split(':')[0] + ':3080';
    return window.location.host;
  }

  getWidth(){
    const breedte = this.getSetting('thumbnailsize')
    return parseInt(breedte);
  }

  getHeight() {
    const breedte = this.getSetting('thumbnailsize')
    const hoogte = parseInt(breedte) / 800 * 600;
    return hoogte;
  }

  getSetting( name: string): string {
    for(let sett of this.settings){
      if(sett.name === name) {
        return sett.value === undefined ? '' : sett.value;
      }
    }
    return '';
  }

  getStatus(page: Page) {
    const url = page.theurl === undefined ? null : page.theurl;
    // console.log(url);
    if(url && url === 'https://oeribel.nl') {
      // console.log('go ' + url);
      // this.appService.ping(url).subscribe((data: {}) => {
      //   const screenshot = JSON.parse(JSON.stringify(data))['data'];
      //   console.log(screenshot);
      //   return '';
      // })
    }
  }

  handleKeyUp(e: any){
    if(e.keyCode === 13){
      window.location.href = "https://duckduckgo.com/?q=" + e.target.value;
    }
  }
}
