import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class MatrixService {
  public onMatrixListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onMatrixListChanged = new BehaviorSubject({});
  }

  getStatedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${APP_CONFIG.apiUrl}`);
  }

  getConfirmedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${APP_CONFIG.apiUrl}`);
  }

  getDispatchedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${APP_CONFIG.apiUrl}`);
  }

  getproductivityMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${APP_CONFIG.apiUrl}`);
  }

}
