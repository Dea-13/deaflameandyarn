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

  getConfExtrusion(offset:number, limit:number, sp:string, bt:string, et:string, ds:string, lfp:string, kgn:string, kgg:string, bi:string, fbc:string, lb:string, bm:string, po:string, bp:string, el:string, pe:string, poq:string, remarks:any, rq:string, alloy:string, noe:string, oa:string, profile:string, length:string, temper:string, so:string, soi:string, remainingqty: string, color: string, mstart: string, mend: string, ststart: string, stend: string, pdstart: string, pdend: string, orderType: number, orderBy: number) {
    return this._http.get<any>(`${environment.apiUrl}ExtrusionConfirmation/GetExtrusionConfirmations?offset=${offset}&limit=${limit}&sp=${sp}&bt=${bt}&et=${et}&ds=${ds}&lfp=${lfp}&kgn=${kgn}&kgg=${kgg}&bi=${bi}&fbc=${fbc}&lb=${lb}&bm=${bm}&po=${po}&bp=${bp}&el=${el}&pe=${pe}&poq=${poq}&remarks=${remarks}&rq=${rq}&alloy=${alloy}&noe=${noe}&oa=${oa}&profile=${profile}&length=${length}&temper=${temper}&so=${so}&soi=${soi}&remainingqty=${remainingqty}&color=${color}&mstart=${mstart}&mend=${mend}&ststart=${ststart}&stend=${stend}&pdstart=${pdstart}&pdend=${pdend}&orderType=${orderType}&orderBy=${orderBy}`);
  }

  getFilters(url: string, sp:string, bt:string, et:string, ds:string, lfp:string, kgn:string, kgg:string, bi:string, fbc:string, lb:string, bm:string, po:string, bp:string, el:string, pe:string, poq:string, remarks:any, rq:string, alloy:string, noe:string, oa:string, profile:string, length:string, temper:string, so:string, soi:string, remainingqty: string, color: string, mstart: string, mend: string, ststart: string, stend: string, pdstart: string, pdend: string) {
    return this._http.get<any>(`${environment.apiUrl}ExtrusionConfirmation/filter/${url}?sp=${sp}&bt=${bt}&et=${et}&ds=${ds}&lfp=${lfp}&kgn=${kgn}&kgg=${kgg}&bi=${bi}&fbc=${fbc}&lb=${lb}&bm=${bm}&po=${po}&bp=${bp}&el=${el}&pe=${pe}&poq=${poq}&remarks=${remarks}&rq=${rq}&alloy=${alloy}&noe=${noe}&oa=${oa}&profile=${profile}&length=${length}&temper=${temper}&so=${so}&soi=${soi}&remainingqty=${remainingqty}&color=${color}&mstart=${mstart}&mend=${mend}&ststart=${ststart}&stend=${stend}&pdstart=${pdstart}&pdend=${pdend}`);
  }

  exportTable(sp:string, bt:string, et:string, ds:string, lfp:string, kgn:string, kgg:string, bi:string, fbc:string, lb:string, bm:string, po:string, bp:string, el:string, pe:string, poq:string, remarks:any, rq:string, alloy:string, noe:string, oa:string, profile:string, length:string, temper:string, so:string, soi:string, remainingqty: string, color: string, mstart: string, mend: string, ststart: string, stend: string, pdstart: string, pdend: string, orderType: number, orderBy: number) {
    return this._http.get<any>(`${environment.apiUrl}ExtrusionConfirmation/GetExtrusionConfirmations/export?sp=${sp}&bt=${bt}&et=${et}&ds=${ds}&lfp=${lfp}&kgn=${kgn}&kgg=${kgg}&bi=${bi}&fbc=${fbc}&lb=${lb}&bm=${bm}&po=${po}&bp=${bp}&el=${el}&pe=${pe}&poq=${poq}&remarks=${remarks}&rq=${rq}&alloy=${alloy}&noe=${noe}&oa=${oa}&profile=${profile}&length=${length}&temper=${temper}&so=${so}&soi=${soi}&remainingqty=${remainingqty}&color=${color}&mstart=${mstart}&mend=${mend}&ststart=${ststart}&stend=${stend}&pdstart=${pdstart}&pdend=${pdend}&orderType=${orderType}&orderBy=${orderBy}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

}
