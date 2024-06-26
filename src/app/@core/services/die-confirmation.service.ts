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

  getFilters(url: string) {
    return this._http.get<any>(`${environment.apiUrl}${url}`);
  }

  getPositionDie(offset: number, limit:number, orderType: number, orderBy:number, resourceName:string, storagePlace: string, die: string) {
    return this._http.get<any>(`${environment.apiUrl}Resource/die/position?offset=${offset}&limit=${limit}&orderType=${orderType}&orderBy=${orderBy}&resourceName=${resourceName}&storagePlace=${storagePlace}&die=${die}`);
  }

  getBarCode(offset: number, limit:number, dieId:string, primaryResourceName: string, channels: string) {
    return this._http.get<any>(`${environment.apiUrl}Dies/confirmation?offset=${offset}&limit=${limit}&DieId=${dieId}&PrimaryResourceName=${primaryResourceName}&Channels=${channels}`);
  }

  getImage(id:number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/image/${id}`);
  }

  getMovements(id:number) {
    return this._http.get<any>(`${environment.apiUrl}DieMovement/getLastDieMovement?resourceID=${id}`);
  }

  getMovementsInit() {
    return this._http.get<any>(`${environment.apiUrl}DieMovement/getLastDieMovement`);
  }

  getResource() {
    return this._http.get<any>(`${environment.apiUrl}Resource/resources`);
  }

  getEmployee() {
    return this._http.get<any>(`${environment.apiUrl}Employees/all/employee`);
  }

  getChannels() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/Channels/10`);
  }

  primaryResource() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/PrimaryResourceName`);
  }

  getDies() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/DieId/40`);
  }

  postDieMovemanetConf(obj:any){
    const data = JSON.stringify(obj);
    return this._http.post(`${environment.apiUrl}DieMovement/DieMovement`, data);
  }

}
