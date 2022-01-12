import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "./service/app-service.service";
import {FormBuilder} from "@angular/forms";
import {Setting} from "./model/setting.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foardoar';
}
