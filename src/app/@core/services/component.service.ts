import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ComponentService {
  public onComponentListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onComponentListChanged = new BehaviorSubject({});
  }

  getComponents(id:number, produced:any, quantity:any) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderOperationComponent/getorderoperationcomponents/${id}/${produced}/${quantity}`);
  }

  getPdfPreviewer(label:string, id:number) {
    // return this._http.get<any>(`${environment.apiUrl}Report/ssrs/${label}/${id}`);
    return this._http.get<any>(`${environment.apiUrl}Report/ssrs/${label}/${id}`);
  }

  getLocationCode(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetNavConsumptionLocationCode/${id}`);
  }

  getMaterialAndWarehouse(productId:any, workcenterId:any) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetCurrentStockLevelByMaterialAndWarehouse/${productId}/${workcenterId}`);
  }

  getConsumptionCode(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetNavConsumptionLocationCode/${id}`);
  }

  getMaterialInventories(productId:any, code:any) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetMaterialInventoriesByNavConsumptionCode/${productId}/${code}`);
  }

  RegisterOrderOperationConfirmationForShopFloor(obj:any){
    const data = JSON.stringify(obj);
    return this._http.post(`${environment.apiUrl}ProductionOrderConfirmation/RegisterOrderOperationConfirmationForShopFloor`, data);
  }

  SaveProductionWarehouseTransactionForShopfloor(obj:any){
    const data = JSON.stringify(obj);
    return this._http.post(`${environment.apiUrl}ProductionOrderConfirmation/SaveProductionWarehouseTransactionForShopfloor`, data);
  }

}
