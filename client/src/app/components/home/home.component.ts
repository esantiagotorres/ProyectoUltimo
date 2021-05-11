import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import {ProductInterface} from '../../models/product-interface';

import { UserInterface } from 'src/app/models/user-interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //eje
  message: string;
  
  constructor(private dataApi: DataApiService, public authService: AuthService) {

    this.message = this.authService.getCurrentUser().id;

  }
  public products: ProductInterface;
  user: UserInterface;
  
  

  ngOnInit(): void {
    //this.getListProducts();
    this.getListProducts2();
    
  }

  getListProducts(){
    this.dataApi
    .getIdUserProducts()
    .subscribe((products: ProductInterface) => (this.products = products));
  }

  getListProducts2(){
    this.dataApi
    .getAllProducts()
    .subscribe((products: ProductInterface) => (this.products = products));
  }
  

}
