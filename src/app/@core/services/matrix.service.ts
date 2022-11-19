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

  getInformationMatrix(offset:number, limit:any, status:number, DieId:string, ProfileId:string, PrimaryResourceName:string, ProducerName:string, CorrectorName:string, Diameter:string, Thickness:string, Alloy:string, Temper:string, BolsterTooling1:string, BolsterTooling2:string, DieHolder:string, Container:string, Notes:string, ClientName:string, DateOrder:string, Price:string, PriceInv:string, DateConfirmation:string, DateExpedition:string, DateScrapped:string, Channels:string, GrM:string, LastModified:string) {
    return this._http.get<any>(`${environment.apiUrl}Dies?offset=${offset}&limit=${limit}&status=${status}&DieId=${DieId}&ProfileId=${ProfileId}&PrimaryResourceName=${PrimaryResourceName}&ProducerName=${ProducerName}&CorrectorName=${CorrectorName}&Diameter=${Diameter}&Thickness=${Thickness}&Alloy=${Alloy}&Temper=${Temper}&BolsterTooling1=${BolsterTooling1}&BolsterTooling2=${BolsterTooling2}&DieHolder=${DieHolder}&Container=${Container}&Notes=${Notes}&ClientName=${ClientName}&DateOrder=${DateOrder}&Price=${Price}&PriceInv=${PriceInv}&DateConfirmation=${DateConfirmation}&DateExpedition=${DateExpedition}&DateScrapped=${DateScrapped}&Channels=${Channels}&GrM=${GrM}&LastModified=${LastModified}`);
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

  getUsedMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getUsedByStatus(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getStayMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getNewMatrixByMonth(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getNoMotionMatrix(offset:number, limt:any, search:any) {
    return this._http.get<any>(`${environment.apiUrl}`);
  }

  getStatusFilters(url: string) {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/${url}`);
  }

  ///////////////// MODAL

  getExtrusion(id: number) {
    return this._http.get<any>(`${environment.apiUrl}ExtrusionConfirmation/GetExtrusionConfirmation/${id}`);
  }

  getImage(id:number) {
    return this._http.get<any>(`${environment.apiUrl}Profiles/image/${id}`);
  }

  getMovements(id:number) {
    return this._http.get<any>(`${environment.apiUrl}DieMovement/getLastDieMovementByDieId?dieID=${id}`);
  }

  getExtrusionData(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProductionData/GetExtrusionData/${id}`);
  }

  createMatrix(matrix: any) {
    const data = JSON.stringify(matrix);
    return this._http.post<any>(`${environment.apiUrl}`, data);
  }

  updateMatrix(matrix: any) {
    const data = JSON.stringify(matrix);
    return this._http.put(`${environment.apiUrl}`, data);
  }

}
