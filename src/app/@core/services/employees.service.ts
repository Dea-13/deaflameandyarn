import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class EmployeesService {
  public onEmployeesListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onEmployeesListChanged = new BehaviorSubject({});
  }

  getEmployees(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${APP_CONFIG.apiUrl}`);
  }

}
