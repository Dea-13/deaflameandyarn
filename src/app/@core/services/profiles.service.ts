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
    scrapEnd:string, cooling:string, coolingSms:string, coolingAdd:string, basketOrdering:string, notesExtrusion:string, important:string, inUse:string, orderType: any, orderBy: any
    ) {
    return this._http.get<any>(`${environment.apiUrl}Profiles?offset=${offset}&limit=${limit}&profileName=${profileName}&groupCode=${groupCode}&section=${section}&perimeter=${perimeter}&grM=${grM}&primaryPress=${primaryPress}&alternativePress=${alternativePress}&size1=${size1}&size2=${size2}&size3=${size3}&size4=${size4}&usage=${usage}&extrusionSpeed=${extrusionSpeed}&extrusionSpeedSms=${extrusionSpeedSms}&opPerf=${opPerf}&tbillet=${tbillet}&tExit=${tExit}&puller=${puller}&scrapStart=${scrapStart}&scrapStartSms=${scrapStartSms}&scrapEnd=${scrapEnd}&cooling=${cooling}&coolingSms=${coolingSms}&coolingAdd=${coolingAdd}&basketOrdering=${basketOrdering}&notesExtrusion=${notesExtrusion}&important=${important}&inUse=${inUse}&orderType=${orderType}&orderBy=${orderBy}`);
  }

  getProductProfiles(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getRawMaterialProductionProfiles(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getFilters(url: string, profileName:string, groupCode:string, section:string, perimeter:string, grM:string, primaryPress:string, alternativePress:string, size1:string, size2:string, size3:string,size4:string, usage:string, extrusionSpeed:string, extrusionSpeedSms:string, opPerf:string, tbillet:string, tExit:string, puller:string, scrapStart:string, scrapStartSms:string,scrapEnd:string, cooling:string, coolingSms:string, coolingAdd:string, basketOrdering:string, notesExtrusion:string, selImportant:string, inUse:string) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/all/params/${url}?profileName=${profileName}&groupCode=${groupCode}&section=${section}&perimeter=${perimeter}&grM=${grM}&primaryPress=${primaryPress}&alternativePress=${alternativePress}&size1=${size1}&size2=${size2}&size3=${size3}&size4=${size4}&usage=${usage}&extrusionSpeed=${extrusionSpeed}&extrusionSpeedSms=${extrusionSpeedSms}&opPerf=${opPerf}&tbillet=${tbillet}&tExit=${tExit}&puller=${puller}&scrapStart=${scrapStart}&scrapStartSms=${scrapStartSms}&scrapEnd=${scrapEnd}&cooling=${cooling}&coolingSms=${coolingSms}&coolingAdd=${coolingAdd}&basketOrdering=${basketOrdering}&notesExtrusion=${notesExtrusion}&important=${selImportant}&inUse=${inUse}`);
  }

  getProfileProduct(
    offset: number, limit:number,
    eRPItem:string, eRPVariant:string, opNo:string, cNC1:string, cNC2:string, subContractor1:string, punching1:string, punching2:string, garda3:string, minutesPerPiece:string, weightPerPiece:string, lprkr:string, lobr:string, npr:string, setupSameProfile:string, setupOtherProfile:string, orderType: any, orderBy: any) {
    return this._http.get<any>(`${environment.apiUrl}ProfileProduct?offset=${offset}&limit=${limit}&eRPItem=${eRPItem}&eRPVariant=${eRPVariant}&opNo=${opNo}&cNC1=${cNC1}&cNC2=${cNC2}&subContractor1=${subContractor1}&punching1=${punching1}&punching2=${punching2}&garda3=${garda3}&minutesPerPiece=${minutesPerPiece}&weightPerPiece=${weightPerPiece}&lprkr=${lprkr}&lobr=${lobr}&npr=${npr}&setupSameProfile=${setupSameProfile}&setupOtherProfile=${setupOtherProfile}&orderType=${orderType}&orderBy=${orderBy}`);
  }

  getProductFilters(url: string, erpitem:string, erpvariant:string, opNo:string, cNC1:string, cNC2:string, subContractor1:string, punching1:string, punching2:string, garda3:string, minutesPerPiece:string, weightPerPiece:string, lprkr:string, lobr:string, npr:string, setupSameProfile:string, setupOtherProfile:string) {
    return this._http.get<any>(`${environment.apiUrl}ProfileProduct/filter/${url}?eRPItem=${erpitem}&eRPVariant=${erpvariant}&opNo=${opNo}&cNC1=${cNC1}&cNC2=${cNC2}&subContractor1=${subContractor1}&punching1=${punching1}&punching2=${punching2}&garda3=${garda3}&minutesPerPiece=${minutesPerPiece}&weightPerPiece=${weightPerPiece}&lprkr=${lprkr}&lobr=${lobr}&npr=${npr}&setupSameProfile=${setupSameProfile}&setupOtherProfile=${setupOtherProfile}`);
  }


  ///////////////// MODAL

  getProfileDies(id: number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/dies/${id}`);
  }

  getProfiles(id: number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/${id}`);
  }

  getFiles(id: number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/files/${id}`);
  }


  getGroupCode() {
    return this._http.get<any>(`${environment.apiUrl}Profiles/all/groupcode/true`);
  }

  getProfilesEnds(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProfilesEnds/${id}`);
  }

  getAlloy() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/Alloy/40`);
  }

  createProfile(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.post<any>(`${environment.apiUrl}Profiles`, data);
  }

  updateProfile(profile: any, id: number) {
    const data = JSON.stringify(profile);
    return this._http.put(`${environment.apiUrl}Profiles`, data);
  }

  createRowsEnd(press: any) {
    const data = JSON.stringify(press);
    return this._http.post<any>(`${environment.apiUrl}ProfilesEnds`, data);
  }

  updateRowsEnd(press: any) {
    const data = JSON.stringify(press);
    return this._http.put(`${environment.apiUrl}ProfilesEnds`, data);
  }

  deleteProfile(id:number){
    return this._http.delete<any>(`${environment.apiUrl}Profiles/${id}`);
  }

  deleteImage(id:number){
    return this._http.delete<any>(`${environment.apiUrl}ProfileFileData/${id}`);
  }

  uploadFile(id: any, profile: any, row: any) {
    const fb: FormData = new FormData()
    fb.append('files', row.file.rawFile);
    return this._http.post<any>(`${environment.apiUrl}ProfileFileData/uploadfile/${id}`, fb);
  }

  updateProductProfile(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.put(`${environment.apiUrl}ProfileProduct`, data);
  }

  createProductProfile(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.post<any>(`${environment.apiUrl}ProfileProduct`, data);
  }

  deleteRowsEnd(id:number, alloy:any){
    return this._http.delete<any>(`${environment.apiUrl}ProfilesEnds/${id}/${alloy}`);
  }

  getProfilesByPress(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProfilesByPress/${id}`);
  }

  updatePress(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.put(`${environment.apiUrl}ProfilesByPress`, data);
  }

  createPress(profile: any) {
    const data = JSON.stringify(profile);
    return this._http.post<any>(`${environment.apiUrl}ProfilesByPress`, data);
  }

  deletePress(id:number){
    return this._http.delete<any>(`${environment.apiUrl}ProfilesByPress/${id}`);
  }

  getPress() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/press`);
  }
}
