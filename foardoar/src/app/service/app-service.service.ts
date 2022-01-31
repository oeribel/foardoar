import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Group} from "../model/group.model";
import {Page} from "../model/page.model";
import {Setting} from "../model/setting.model";

class Groups {
}

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllGroups(): Observable<string> {
    return this.http.get<string>(this.rootURL + '/groups')
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getSubGroups(id: number): Observable<string> {
    return this.http.get<string>(this.rootURL + '/groups/subgroups/' + id)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getGroupById(id: number): Observable<string> {
    return this.http.get<string>(this.rootURL + '/groups/' + id)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getPagesByGroupId(id: number): Observable<string> {
    return this.http.get<string>(this.rootURL + '/pages/' + id)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getNamedPage(namedPage: string): Observable<string> {
    return this.http.get<string>(this.rootURL + '/' + namedPage)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getIp(): Observable<string> {
    return this.http.get<string>(this.rootURL + '/ip')
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getImageByPage(page: Page): Observable<string> {
    return this.http.get<string>(this.rootURL + '/page/image/' + page.id)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getPages(): Observable<string> {
    return this.http.get<string>(this.rootURL + '/pages')
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  createGroups(group: Groups): Observable<Group> {
    return this.http.post<Group>(this.rootURL + '/groups', JSON.stringify(group), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  updateGroups(group: Groups): Observable<Group> {
    return this.http.put<Group>(this.rootURL + '/groups', JSON.stringify(group), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  deleteGroup(group: Group): Observable<string> {
    return this.http.delete<string>(this.rootURL + '/groups/' + group.id)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  createPage(page: Page): Observable<Page> {
    console.log('opslaan 2');
    return this.http.post<Page>(this.rootURL + '/pages', JSON.stringify(page), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  updatePage(page: Page): Observable<Page> {
    return this.http.put<Page>(this.rootURL + '/pages', JSON.stringify(page), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  deletePage(page: Page): Observable<string> {
    return this.http.delete<string>(this.rootURL + '/pages/' + page.id)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  captureWebpage(page: Page):  Observable<string> {
    return this.http.get<string>(this.rootURL + '/screenshot/' + page.id)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getScreenshotByPageId(id: number | undefined) {
    return this.http.get<string>(this.rootURL + '/page/' + id + '/screenshot')
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  getSettings() {
    return this.http.get<string>(this.rootURL + '/settings')
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  createSetting(setting: Setting): Observable<Setting> {
    return this.http.post<Setting>(this.rootURL + '/settings', JSON.stringify(setting), this.httpHeader)
        .pipe(
            retry(1),
            catchError(this.httpError)
        )
  }

  updateSetting(setting: Setting): Observable<Setting> {
    return this.http.put<Setting>(this.rootURL + '/settings', JSON.stringify(setting), this.httpHeader)
        .pipe(
            retry(1),
            catchError(this.httpError)
        )
  }

  ping(url: string){
    return this.http.get<string>(this.rootURL + '/ping/' + url)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
  }

  httpError(error: any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
