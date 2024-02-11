import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any = [];
  grandTotal!: number;
  item: any;
  i: any;


  constructor(private cartservice: CartService) { }
  toggleDescription(event: any) {
    const dropdownContent = event.target.nextElementSibling;
    dropdownContent.classList.toggle('show');
}

  ngOnInit(): void {
    this.cartservice.getProduct()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartservice.getTotalPrice();
      }
      )
  }
  removeItem(item: any){
    this.cartservice.removeCartItem(item);
  }
  emptycart(){
    this.cartservice.removeAllCart();
  }
}
