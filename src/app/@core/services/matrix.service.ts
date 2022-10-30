import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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

  ////////////////// PAGE

  getInformationMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getStatedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getConfirmedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getDispatchedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getproductivityMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getScrapMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getMarkedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getTestMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  ///////////////// MODAL
  createMatrix(matrix: any) {
    const data = JSON.stringify(matrix);
    return this._http.post<any>(`${environment.apiUrl}`, data);
  }

  updateMatrix(matrix: any) {
    const data = JSON.stringify(matrix);
    return this._http.put(`${environment.apiUrl}`, data);
  }

}
