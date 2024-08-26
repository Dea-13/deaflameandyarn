import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class BilletRawMaterialsService {
  public onBilletRawMaterialsListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onBilletRawMaterialsListChanged = new BehaviorSubject({});
  }

  getBilletMaterial(offset:number, limit:any, name:string, description:string, lotno:string, variant:string, uom: string, stockquantity: string, diameter: string, stardate: string, enddate: string, orderType: number, orderBy: number) {
    return this._http.get<any>(`${environment.apiUrl}MaterialInventorie/GetMaterialInventoriesByNavConsumptionCode?offset=${offset}&limit=${limit}&name=${name}&description=${description}&lotno=${lotno}&variant=${variant}&uom=${uom}&stockquantity=${stockquantity}&diameter=${diameter}&stardate=${stardate}&enddate=${enddate}&orderType=${orderType}&orderBy=${orderBy}`);
  }

  getFilters(url: string, name:string, description:string, lotno:string, variant:string, uom: string, stockquantity: string, diameter: string, stardate: string, enddate: string) {
    return this._http.get<any>(`${environment.apiUrl}MaterialInventorie/filter/${url}?&Name=${name}&Description=${description}&LotNo=${lotno}&Variant=${variant}&UoM=${uom}&StockQuantity=${stockquantity}&Diameter=${diameter}&Stardate=${stardate}&Enddate=${enddate}`);
  }

  exportTable(name:string, description:string, lotno:string, variant:string, uom: string, stockquantity: string, diameter: string, stardate: string, enddate: string, orderType: number, orderBy: number) {
    return this._http.get<any>(`${environment.apiUrl}MaterialInventorie/GetMaterialInventoriesByNavConsumptionCode/export?name=${name}&description=${description}&lotno=${lotno}&variant=${variant}&uom=${uom}&stockquantity=${stockquantity}&diameter=${diameter}&stardate=${stardate}&enddate=${enddate}&orderType=${orderType}&orderBy=${orderBy}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

}
