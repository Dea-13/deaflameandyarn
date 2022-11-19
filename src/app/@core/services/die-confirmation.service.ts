import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DieConfirmationService {
  public onDieConfirmationListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onDieConfirmationListChanged = new BehaviorSubject({});
  }

  ////////////////// PAGE
  getBarCode(offset: number, limit:number, diedId:string) {
    return this._http.get<any>(`${environment.apiUrl}Dies/confirmation?offset=${offset}&limit=${limit}&DiedId=${diedId}`);
  }

  getImage(id:number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/image/${id}`);
  }

  getMovements(id:number) {
    return this._http.get<any>(`${environment.apiUrl}DieMovement/getLastDieMovement?resourceID=${id}`);
  }

  getResource() {
    return this._http.get<any>(`${environment.apiUrl}Resource/resources`);
  }

  getEmployee() {
    return this._http.get<any>(`${environment.apiUrl}Employees/all/employee`);
  }

}
