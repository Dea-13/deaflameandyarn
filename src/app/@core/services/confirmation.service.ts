import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  public onConfirmationListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onConfirmationListChanged = new BehaviorSubject({});
  }

  getConfirmations(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderOperation/getProductionOrderOperationParamas/${id}`);
  }

  getReasons(id:number) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderOperation/GetScrapscrapReasons/${id}`);
  }

  getBrak(orderId:number, operationNo:number) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderOperation/GetScrapPrevStageWorkcenters/${orderId}/${operationNo}`);
  }

  getOrderConfirm(bomCode:any, salesDesc:any) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetPiecesInHuFromNav/${bomCode}/${salesDesc}`);
  }

  getPreviousOperation(productId:any, opNo:any) {
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetCurrentStockLevelFromPreviusOp/${productId}/${opNo}`);
  }

  getPallet() {
    return this._http.get<any>(`${environment.apiUrl}Warehouse/all/palletsforshopfloor`);
  }

  getStock(pallet){
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetCurrentStockLevel/${pallet}`);
  }

  checkIfApproved(sn){
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/CheckForActiveBacth/${sn}`);
  }

  generateNewOrder(orderId:number, quantity:string){
    const data = [];
    return this._http.post<any>(`${environment.apiUrl}ProductionOrder/DuplicateOrder?orderId=${orderId}&quantity=${quantity}`, data);
  }

  getCurrentAutomotivePackingLotNo(id){
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/GetCurrentAutomotivePackingLotNo/${id}`);
  }

  checkForDoubleDMCCode(id){
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderConfirmation/CheckForDoubleDMCCode/${id}`);
  }

  getOrderOperationBilletLotNos(id){
    return this._http.get<any>(`${environment.apiUrl}ProductionOrderOperation/GetOrderOperationBilletLotNos/${id}`);
  }

  getConfExtrusion(){
    return this._http.get<any>(`${environment.apiUrl}ExtrusionConfirmation/GetExtrusionConfirmations`);
  }

}
