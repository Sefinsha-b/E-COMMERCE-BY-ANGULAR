import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public CartItemList: any = []
  public ProductList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");


  constructor() { }
  getProduct() {
    return this.ProductList.asObservable();
  }
  setProduct(product: any) {
    this.CartItemList.push(...product);
    this.ProductList.next(product);
  }
  addtoCart(product: any) {
    this.CartItemList.push(product);
    this.ProductList.next(this.CartItemList);
    this.getTotalPrice();
    console.log(this.CartItemList)
  }
  getTotalPrice():number {
    let grandTotal = 0;
    this.CartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.CartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.CartItemList.splice(index, 1);
      }
    })
    this.ProductList.next(this.CartItemList);// this is for decresing the length num in the svg of wallet
  }
  removeAllCart() {
    this.CartItemList = []
    this.ProductList.next(this.CartItemList);
  }

}
