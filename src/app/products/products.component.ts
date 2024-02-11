import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  ProductList: any[] = [];
searchKey: string='';
  filterCategory: any;

  constructor(private api: ApiService, private cartservice: CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.ProductList = res;
      this.filterCategory = res;
      this.ProductList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.ProductList)
    });

    this.cartservice.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    this.cartservice.addtoCart(item);
  }
  filter(category:string){
    this.filterCategory = this.ProductList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}