import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
})
export class CartDetailComponent implements OnInit {
  prixTotal: any;
  prix: any;
  quantite: any;
  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  toNumber(text: string): number {
    return Number(text);
  }

  totalSum(items: any): number {
    let sum: number = 0;
    items.forEach((item: any) => {
      const price = item?.articleInfo.producType == 'estamp' ? Number(item.articleInfo.price) : Number(item.articleInfo.price) *1000;
      sum += item.quantity * price;
    });
    return sum;
  }

  deleteItemCart(index: number) {
    this.cartService.deleteItmCart(index);
  }

  cartStep2() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
