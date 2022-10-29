import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from "primeng/api";
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  product: any;
  idProduct: any;
  quantity: number = 0;
  availableQuantity: number = 0;
  constructor(
    private router: ActivatedRoute,
    private homeService: HomeService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.idProduct = this.router.snapshot.params['id'];
    this.homeService.getProductDetails(this.idProduct).subscribe(
      (res: any) => {
        this.product = res;
        // Change Available Quantity
        if(this.product.producType === 'estamp'){
          this.availableQuantity = this.product.estamp.QunatityEstampDisponible;
        }else{
          this.availableQuantity = this.product.efleur.QunatityEfleurDisponible;
        }
        // update quantity if availableQuantity > 0
        if(this.availableQuantity > 0){
          this.quantity = 1;
        }
      });
  }

  addQuantity() {
    if (this.quantity < this.availableQuantity) {
      this.quantity++;
    }
  }

  moinsQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addProductToCart(product: any) {
    let article = {
      productId: product._id,
      quantity: this.quantity,
      articleInfo: product,
    };
    this.cartService.addToCartTemp(article);
  }
}
