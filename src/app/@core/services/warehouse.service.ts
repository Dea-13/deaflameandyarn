import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class WarehouseService {
  public onWarehouseListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onWarehouseListChanged = new BehaviorSubject({});
  }

  getInformationWarehouse(offset:number, limit:number, resourceName:Array<any>, storagePlace:Array<any>, status:number) {
    return this._http.get<any>(`${environment.apiUrl}Resource?offset=${offset}&limit=${limit}&resourceName=${resourceName}&storagePlace=${storagePlace}&status=${status}`);
  }

  // getFreeAddressWarehouse(offset:number, limt:any, search:any) {
  //   return this._http.get<any>(`${environment.apiUrl}`);
  // }

  // getOccupiedMatrixWarehouse(offset:number, limt:any, search:any) {
  //   return this._http.get<any>(`${environment.apiUrl}`);
  // }

  getFilters(url: string) {
    return this._http.get<any>(`${environment.apiUrl}Resource/all/${url}`);
  }

}
