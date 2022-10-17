import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APP_CONFIG } from '../../../environments/environment';
import { User } from '../models';


@Injectable({ providedIn: 'root' })
export class UserService {
  
  constructor(private _http: HttpClient) {}

  getById(id: number) {
    return this._http.get<User>(`${APP_CONFIG.apiUrl}users/${id}`);
  }

}
