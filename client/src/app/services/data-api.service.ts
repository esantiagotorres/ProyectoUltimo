import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import{ ProductInterface} from '../models/product-interface';

import { UserInterface } from 'src/app/models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  products: Observable<any>;
  product: Observable<any>;
  user: UserInterface;

  public selectedProduct: ProductInterface = {
    id:null,
    nombre: '',
    descripcion:'',
    precio:'',
    foto:'',
    imagen:'',
    //cambio
    identifacorusuario:''
  };


  headers : HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json",
    Authorization: this.authService.getToken()
  });

  getAllProducts(){ 
    const url_api = 'http://localhost:3000/api/productos';
    return this.http.get(url_api);
  }

  getIdUserProducts(){ 
    this.user=this.authService.getCurrentUser();
    //console.log("este es mi token: " + this.authService.getToken());
    const iduser: string = this.user.id;
    //const iduser = this.authService.getCurrentUser().id;
    const url_api = `http://localhost:3000/api/productos?filter[where][identifacorusuario]=6`;
    //console.log("esta deberia ser la url: " + iduser);
    //'http://localhost:3000/api/productos?filter[where][identifacorusuario]=6';
    return this.http.get(url_api);
  }

  getProductById(id:string){
    const url_api = `http://localhost:3000/api/productos/${id}`;
    return (this.product = this.http.get(url_api));
  }
  
  saveProduct(product: ProductInterface){
    const token = this.authService.getToken();
    const url_api = `http://localhost:3000/api/productos?access_token=${token}`;
    return this.http.post<ProductInterface>(url_api, product,{headers: this.headers})
    .pipe(map(data => data));

  }

  updateProduct(product){
    const productId = product.productId;
    const token = this.authService.getToken();
    const url_api = `http://localhost:3000/api/productos/${productId}/?access_token=${token}`;
    return this.http.put<ProductInterface>(url_api, product,{headers: this.headers})
    .pipe(map(data => data));
  }

  deleteProduct(id: string){
    const token = this.authService.getToken();
    const url_api = `http://localhost:3000/api/productos/${id}/?access_token=${token}`;
    return this.http.delete<ProductInterface>(url_api,{headers: this.headers})
    .pipe(map(data => data));

  }



}
 