import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ManufacturersService {
  public onManufacturersListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onManufacturersListChanged = new BehaviorSubject({});
  }

  ////////////////// PAGE
  getManufacturers(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  ///////////////// MODAL
  createManufacturer(manufacturer: any) {
    const data = JSON.stringify(manufacturer);
    return this._http.post<any>(`${environment.apiUrl}`, data);
  }

  updateManufacturer(manufacturer: any) {
    const data = JSON.stringify(manufacturer);
    return this._http.put(`${environment.apiUrl}`, data);
}

}
