import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProfilesService {
  public onProfilesListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onProfilesListChanged = new BehaviorSubject({});
  }

  ////////////////// PAGE
  getInformationProfiles(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getProductProfiles(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getRawMaterialProductionProfiles(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  ///////////////// MODAL
  createProfile(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.post<any>(`${environment.apiUrl}`, data);
  }

  updateProfile(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.put(`${environment.apiUrl}`, data);
  }
}
