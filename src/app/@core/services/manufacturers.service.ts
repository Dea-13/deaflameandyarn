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
  getManufacturers(offset:number, limit:any, name:string) {
    return this._http.get<any>(`${environment.apiUrl}Suppliers?offset=${offset}&limit=${limit}&name=${name}`);
  }

  getFilters() {
    return this._http.get<any>(`${environment.apiUrl}Suppliers/all/name`);
  }

  deleteManufacturers(id:number) {
    return this._http.delete<any>(`${environment.apiUrl}Suppliers/${id}`);
  }

  ///////////////// MODAL
  createManufacturer(manufacturer: any) {
    const data = JSON.stringify(manufacturer);
    return this._http.post<any>(`${environment.apiUrl}Suppliers`, data);
  }

  updateManufacturer(manufacturer: any) {
    const data = JSON.stringify(manufacturer);
    return this._http.put(`${environment.apiUrl}Suppliers`, data);
}

}
