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
  getInformationProfiles(
    offset: number, limit:number,
    profileName:string, groupCode:string, section:string, perimeter:string, grM:string, primaryPress:string, alternativePress:string, size1:string, size2:string, size3:string,
    size4:string, usage:string, extrusionSpeed:string, extrusionSpeedSms:string, opPerf:string, tbillet:string, tExit:string, puller:string, scrapStart:string, scrapStartSms:string,
    scrapEnd:string, cooling:string, coolingSms:string, coolingAdd:string, basketOrdering:string, notesExtrusion:string, important:string, inUse:string
    ) {
    return this._http.get<any>(`${environment.apiUrl}Profiles?offset=${offset}&limit=${limit}&profileName=${profileName}&groupCode=${groupCode}&section=${section}&perimeter=${perimeter}&grM=${grM}&primaryPress=${primaryPress}&alternativePress=${alternativePress}&size1=${size1}&size2=${size2}&size3=${size3}&size4=${size4}&usage=${usage}&extrusionSpeed=${extrusionSpeed}&extrusionSpeedSms=${extrusionSpeedSms}&opPerf=${opPerf}&tbillet=${tbillet}&tExit=${tExit}&puller=${puller}&scrapStart=${scrapStart}&scrapStartSms=${scrapStartSms}&scrapEnd=${scrapEnd}&cooling=${cooling}&coolingSms=${coolingSms}&coolingAdd=${coolingAdd}&basketOrdering=${basketOrdering}&notesExtrusion=${notesExtrusion}&important=${important}&inUse=${inUse}`);
  }

  getProductProfiles(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getRawMaterialProductionProfiles(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getFilters(url: string) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/all/${url}`);
  }

  ///////////////// MODAL

  getProfileDies(id: number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/dies/${id}`);
  }

  getProfiles(id: number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/${id}`);
  }

  getGroupCode() {
    return this._http.get<any>(`${environment.apiUrl}Profiles/all/groupcode/true`);
  }

  createProfile(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.post<any>(`${environment.apiUrl}`, data);
  }

  updateProfile(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.put(`${environment.apiUrl}`, data);
  }
}
