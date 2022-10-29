import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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

  ////////////////// PAGE
  getEmployees(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  ///////////////// MODAL
  createEmployee(employee: any) {
    const data = JSON.stringify(employee);
    return this._http.post<any>(`${environment.apiUrl}`, data);
  }

  updateEmployee(employee: any) {
    const data = JSON.stringify(employee);
    return this._http.put(`${environment.apiUrl}`, data);
  }

}
