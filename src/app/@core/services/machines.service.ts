import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class MachinesService {
  public onMachinesListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onMachinesListChanged = new BehaviorSubject({});
  }

  getMachines() {
    return this._http.get<any>(`${environment.apiUrl}StructureObject/all`);
  }

}
