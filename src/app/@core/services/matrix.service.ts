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

  getInformationMatrix(offset:number, limit:any, status:number, DieId:string, ProfileId:string, PrimaryResourceName:string, ProducerName:string, CorrectorName:string, Diameter:string, Thickness:string, Alloy:string, Temper:string, BolsterTooling1:string, BolsterTooling2:string, DieHolder:string, Container:string, Notes:string, ClientName:string, DateOrder:any, Price:string, PriceInv:string, DateConfirmation:string, DateExpedition:string, DateScrapped:string, Channels:string, GrM:string, LastModified:string, BmwInventoryNumber:string, DieLiveQty: string, orderType: any, orderBy: any) {
    return this._http.get<any>(`${environment.apiUrl}Dies?offset=${offset}&limit=${limit}&status=${status}&DieId=${DieId}&ProfileId=${ProfileId}&PrimaryResourceName=${PrimaryResourceName}&ProducerName=${ProducerName}&CorrectorName=${CorrectorName}&Diameter=${Diameter}&Thickness=${Thickness}&Alloy=${Alloy}&Temper=${Temper}&BolsterTooling1=${BolsterTooling1}&BolsterTooling2=${BolsterTooling2}&DieHolder=${DieHolder}&Container=${Container}&Notes=${Notes}&ClientName=${ClientName}&DateOrder=${DateOrder}&Price=${Price}&PriceInv=${PriceInv}&DateConfirmation=${DateConfirmation}&DateExpedition=${DateExpedition}&DateScrapped=${DateScrapped}&Channels=${Channels}&GrM=${GrM}&LastModified=${LastModified}&BmwInventoryNumber=${BmwInventoryNumber}&DieLiveQty=${DieLiveQty}&orderType=${orderType}&orderBy=${orderBy}`);
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

  getStatusFilters(url: string, statusId:number, DieId:string, ProfileId:string, PrimaryResourceName:string, ProducerName:string, CorrectorName:string, Diameter:string, Thickness:string, Alloy:string, Temper:string, BolsterTooling1:string, BolsterTooling2:string, DieHolder:string, Container:string, Notes:string, ClientName:string, Price:string, PriceInv:string, Channels:string) {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/params/${url}?status=${statusId}&DieId=${DieId}&ProfileId=${ProfileId}&PrimaryResourceName=${PrimaryResourceName}&ProducerName=${ProducerName}&CorrectorName=${CorrectorName}&Diameter=${Diameter}&Thickness=${Thickness}&Alloy=${Alloy}&Temper=${Temper}&BolsterTooling1=${BolsterTooling1}&BolsterTooling2=${BolsterTooling2}&DieHolder=${DieHolder}&Container=${Container}&Notes=${Notes}&ClientName=${ClientName}&Price=${Price}&PriceInv=${PriceInv}&Channels=${Channels}`);
  }

  getNitrificationMatrix(offset: number, limit: number, DieId: string, PrimaryResourceName: string, Channels: string, substatus: string) {
    return this._http.get<any>(`${environment.apiUrl}Dies?offset=${offset}&limit=${limit}&status=100&DieId=${DieId}&PrimaryResourceName=${PrimaryResourceName}&Channels=${Channels}&substatus=${substatus}`);
  }

  getDieID() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/DieId/40`);
  }

  getChannelsDie() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/Channels/40`);
  }

  getStatusDie() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/diestatus`);
  }

  getCurrentResource() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/PrimaryResourceName`);
  }

  ///////////////// MODAL NEW MATRIX

  getDieById(id: number) {
    return this._http.get<any>(`${environment.apiUrl}Dies/${id}`);
  }

  getStatus() {
    return this._http.get<any>(`${environment.apiUrl}Dies/GetDiesStatus`);
  }

  getProfile() {
    return this._http.get<any>(`${environment.apiUrl}Profiles/all/profilenameId/true`);
  }


  getDieLiveQty() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/dieliveqty`);
  }

  bmwNumber() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/bmwinventorynumber`);
  }

  getMatrix(id:string) {
    return this._http.get<any>(`${environment.apiUrl}Dies/die/name/${id}`);
  }

  getChannels(id:number) {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/Channels/${id}`);
  }

  getOpora() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/opora`);
  }

  getType() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/type`);
  }

  getContainer() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/container`);
  }

  getBolster1() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/BolsterTooling1`);
  }

  getBolster2() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/BolsterTooling2`);
  }

  getClientName() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/clientname`);
  }

  getProducer() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/producernameid`);
  }

  getPurchaser() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/purchaser`);
  }

  getMatricologist() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/correctornameid`);
  }

  getPress() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/press`);
  }

  getAlloy() {
    return this._http.get<any>(`${environment.apiUrl}Dies/all/Alloy/40`);
  }

  getProfilesByPress(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProfilesByPress/${id}`);
  }

  getProfilesEnds(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProfilesEnds/${id}`);
  }

  deleteRowsPress(id:number){
    return this._http.delete<any>(`${environment.apiUrl}ProfilesByPress/${id}`);
  }

  deleteRowsEnd(id:number, alloy: string){
    return this._http.delete<any>(`${environment.apiUrl}ProfilesEnds/${id}/${alloy}`);
  }

  createRowsPress(press: any) {
    const data = JSON.stringify(press);
    return this._http.post<any>(`${environment.apiUrl}ProfilesByPress`, data);
  }

  updateRowsPress(press: any) {
    const data = JSON.stringify(press);
    return this._http.put(`${environment.apiUrl}ProfilesByPress`, data);
  }

  createRowsEnd(press: any) {
    const data = JSON.stringify(press);
    return this._http.post<any>(`${environment.apiUrl}ProfilesEnds`, data);
  }

  updateRowsEnd(press: any) {
    const data = JSON.stringify(press);
    return this._http.put(`${environment.apiUrl}ProfilesEnds`, data);
  }

  getDieMovement(ComputerName:string, ResourceInName:string, ResourceOutName:string, year:string, month:string) {
    return this._http.get<any>(`${environment.apiUrl}DieMovement/statistic?ComputerName=${ComputerName}&ResourceInName=${ResourceInName}&ResourceOutName=${ResourceOutName}&year=${year}&month=${month}`);
  }

  getFilters(url: string, computerName:string, resourceInName:string, resourceOutName:string, year:string, month:string) {
    return this._http.get<any>(`${environment.apiUrl}DieMovement/all/params/${url}?ComputerName=${computerName}&ResourceInName=${resourceInName}&ResourceOutName=${resourceOutName}&year=${year}&month=${month}`);
  }

  getChartYear(year:string) {
    return this._http.get<any>(`${environment.apiUrl}DieMovement/statistic/${year}`);
  }

  ///////////////// MODAL DETAILS

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

  getHeaderDetails(id:number) {
    return this._http.get<any>(`${environment.apiUrl}Dies/dieHistory/${id}`);
  }

  getMatricComplect() {
    return this._http.get<any>(`${environment.apiUrl}DiesDefDimByRes`);
  }

  getStorage() {
    return this._http.get<any>(`${environment.apiUrl}Resource/all/resourcestorageplaces`);
  }

  getMatricComplectById(diameter: number, thickness: number, resourceId: number) {
    return this._http.get<any>(`${environment.apiUrl}DiesDefDimByRes/${diameter}/${thickness}/${resourceId}`);
  }

  createMatrix(matrix: any) {
    const data = JSON.stringify(matrix);
    return this._http.post<any>(`${environment.apiUrl}Dies`, data);
  }

  updateMatrix(matrix: any) {
    const data = JSON.stringify(matrix);
    return this._http.put(`${environment.apiUrl}Dies`, data);
  }

  generateTest(quantity: any, alloy: any, workCenterId: any, dieID: any) {
    const data = JSON.stringify('');
    return this._http.post(`${environment.apiUrl}Dies/CreateTestOrder/${quantity}/${alloy}/${workCenterId}/${dieID}`, data);
  }

}
