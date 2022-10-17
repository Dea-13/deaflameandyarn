import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' }) 
export class OperationsService {
  public onOperationsListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onOperationsListChanged = new BehaviorSubject({});
  }

  getOperations(offset:number, limit:number, workcenter:number) {
    return this._http.get<any>(`${APP_CONFIG.apiUrl}ProductionOrder/order/orderandoperationbyworkcenteridforshopfloor?&offset=${offset}&limit=${limit}&workcenter=${workcenter}`);
  }

  searchOperations(workcenter:number, search: string) {
    return this._http.get<any>(`${APP_CONFIG.apiUrl}ProductionOrder/order/searchorderandoperationbyworkcenteridforshopfloor?&workcenter=${workcenter}&search=${search}`);
  }

}
