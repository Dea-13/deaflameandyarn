import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class BilletRawMaterialsService {
  public onBilletRawMaterialsListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onBilletRawMaterialsListChanged = new BehaviorSubject({});
  }

  getBilletMaterial() {
    return this._http.get<any>(`${environment.apiUrl}MaterialInventorie/GetMaterialInventoriesByNavConsumptionCode`);
  }

}
