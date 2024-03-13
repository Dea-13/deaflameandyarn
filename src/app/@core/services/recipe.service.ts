import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class RecipeService {
  public onRecipeListChanged: BehaviorSubject<any>;
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.onRecipeListChanged = new BehaviorSubject({});
  }

  ////////////////// MAIN RECIPE
  getRecipe() {
    return this._http.get<any>(`${environment.apiUrl}RecipeHeader/getAllRecipeHeaders`);
  }

  getSubRecipe(id: number) {
    return this._http.get<any>(`${environment.apiUrl}RecipeHeaderLines/getByIdRecipeHeaderLines/${id}`);
  }

  getRecipeById(id: number) {
    return this._http.get<any>(`${environment.apiUrl}RecipeHeader/getByIdRecipeHeader/${id}`);
  }

  createRecipe(recipe: any) {
    const data = JSON.stringify(recipe);
    return this._http.post<any>(`${environment.apiUrl}RecipeHeader`, data);
  }

  updateRecipe(recipe: any) {
    const data = JSON.stringify(recipe);
    return this._http.put(`${environment.apiUrl}RecipeHeader`, data);
  }

  ///////////////// SUB RECIPE
  createSubRecipe(recipe: any) {
    const data = JSON.stringify(recipe);
    return this._http.post<any>(`${environment.apiUrl}RecipeHeaderLines`, data);
  }

  updateSubRecipe(recipe: any) {
    const data = JSON.stringify(recipe);
    return this._http.put(`${environment.apiUrl}RecipeHeaderLines`, data);
  }

  deleteSubRecipe(id: number) {
    return this._http.delete<any>(`${environment.apiUrl}RecipeHeaderLines/${id}`);
  }

}
