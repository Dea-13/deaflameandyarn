import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../models';


@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private _http: HttpClient) {}

  getById(id: number) {
    return this._http.get<User>(`${environment.apiUrl}users/${id}`);
  }

}
