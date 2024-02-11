import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  totalItem: any;
  searchTerm: string='';

  constructor(private cartservice: CartService) { }

  ngOnInit(): void {
    this.cartservice.getProduct()
      .subscribe(res => {
        this.totalItem = res.length;
      })
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    // console.log(this.searchTerm)
    this.cartservice.search.next(this.searchTerm);
  }

}
