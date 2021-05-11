import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../../services/data-api.service';
import {ProductInterface} from '../../../models/product-interface';

import { UserInterface } from 'src/app/models/user-interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  //eje
  message: string;

  constructor(public dataApiService: DataApiService, public authService: AuthService) { 

    this.message = this.authService.getCurrentUser().id;

  }
  user: UserInterface;
  public products: ProductInterface;
  
  /* original */

  ngOnInit(): void {
    //this.getListProducts();
    this.getListProducts2();
  }

  getListProducts():void{
    this.dataApiService.getIdUserProducts()
    .subscribe((products:ProductInterface)=>(this.products=products));
  }
  
  getListProducts2():void{
    this.dataApiService.getAllProducts()
    .subscribe((products:ProductInterface)=>(this.products=products));
  }

  /*
  ngOnInit() {
    const user_id = this.products.identifacorusuario;
    this.getListProducts(user_id);
  }

  getListProducts(identifacorusuario: string){
    this.dataApiService.getAllProducts22(identifacorusuario)
    .subscribe((products:ProductInterface)=>(this.products=products));
  }
  */

  onDeleteProduct(id: string): void {
    if (confirm('¿esta seguro que quiere eliminar este producto?')) {
      this.dataApiService.deleteProduct(id).subscribe();
    }
  }

  onPreUpdateProduct(product: ProductInterface):void{
    this.dataApiService.selectedProduct=Object.assign({},product);

  }



}

