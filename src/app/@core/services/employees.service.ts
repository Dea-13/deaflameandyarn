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
  getEmployees(offset:number, limit:any, name:string, department: string, privilege: string, orderType:number, orderBy: number) {
    return this._http.get<any>(`${environment.apiUrl}Employees?offset=${offset}&limit=${limit}&name=${name}&department=${department}&privilege=${privilege}&orderType=${orderType}&orderBy=${orderBy}`);
  }

  getFilters(url: string) {
    return this._http.get<any>(`${environment.apiUrl}Employees/all/${url}`);
  }

  deleteEmployee(id:number) {
    return this._http.delete<any>(`${environment.apiUrl}Employees/${id}`);
  }

  ///////////////// MODAL
  createEmployee(employee: any) {
    const data = JSON.stringify(employee);
    return this._http.post<any>(`${environment.apiUrl}Employees`, data);
  }

  updateEmployee(employee: any) {
    const data = JSON.stringify(employee);
    return this._http.put(`${environment.apiUrl}Employees`, data);
  }

  exportTable(name:string, department: string, privilege: string, orderType:number, orderBy: number) {
    return this._http.get<any>(`${environment.apiUrl}Employees/export?name=${name}&department=${department}&privilege=${privilege}&orderType=${orderType}&orderBy=${orderBy}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

}
