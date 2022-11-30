import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ToastrService } from 'ngx-toastr';
import { User, Role } from '../models';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;
  public translateSnackBar: any;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService, public translate: TranslateService,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login user
   *
   * @param email
   * @param password
   * @returns user
   */
  loginUser(userName: string, password: string) {
    return this._http
      .post<any>(`${environment.planningUrl}login`, { userName, password })
      .pipe(
        map(user => {
          // login user successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Display welcome toast!
            setTimeout(() => {
              Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: this.translateSnackBar.successLogin ,
                showConfirmButton: false,
                timer: 2000
              })
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  /**
   * User login card
   *
   * @param cart
   * @returns user
   */
  loginCard(cart: string) {
    return this._http
      .get<any>(`${environment.planningUrl}Login/cart/${cart}`)
      .pipe(
        map(user => {
          // login card successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            setTimeout(() => {
              Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: this.translateSnackBar.successLogin ,
                showConfirmButton: false,
                timer: 2000
              })
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
