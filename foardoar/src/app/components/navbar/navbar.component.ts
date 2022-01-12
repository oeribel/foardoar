import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from "../../model/group.model";
import {AppServiceService} from "../../service/app-service.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {Page} from "../../model/page.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  groups: Group[] = [];
  groupId: string = '';
  over = false;
  down = false;
  placeholder = '';

  constructor(private appService: AppServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.getSubGroups(0).subscribe((data: {}) => {
      this.groups = JSON.parse(JSON.stringify(data))['data'];
    })
    this.router.events.subscribe(value => {
      if(this.router.url.toString().indexOf('/group/') >= 0) {
        const deRoute = this.router.url.toString();
        this.groupId = deRoute.split('/')[deRoute.split('/').length-1];
      }else{
        this.groupId = '';
      }
    });
  }

  onMouseOverInput() {
    this.over = true;
    this.placeholder = "Drop hier een url om op te slaan";
  }
  onMouseOutInput() {
    this.over = false;
    this.placeholder = "";
  }

  bla(event: any) {
    console.log(event.target.value);
    let theName = event.target.value;
    const page = {...new Page(), name: theName , theurl: event.target.value};
    this.appService.createPage(page).subscribe();
    event.target.value = ' ';
  }
}
