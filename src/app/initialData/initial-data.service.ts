/* tslint:disable:no-trailing-whitespace */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel, ProductTypeModel} from '../models/models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {
  url: string;
  constructor(public http: HttpClient) {

  }

  getProductType(): Observable<ProductTypeModel[]> {
    this.url = environment.api_url + '/get_prod_type';
    return this.http.get<ProductTypeModel[]>(this.url);
  }

  getAllProduct(): Observable<ProductModel[]> {
    this.url = environment.api_url + '/get_all_prod';
    return this.http.get<ProductModel[]>(this.url);
  }
}
