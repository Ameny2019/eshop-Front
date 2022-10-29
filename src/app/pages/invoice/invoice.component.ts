
import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { EditProfileService } from 'src/app/services/editprofile.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  myProfile: any;
  cart: any;

  constructor(
    public cartServ: CartService,
    public authService: AuthService,
    private editprofileService: EditProfileService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editprofileService
      .getProfile()
      .subscribe((response: any) => {
        this.myProfile = response.data;
      });
    this.route.paramMap.subscribe(params => {
      let idcart = params.get('id_cart');
      this.cartServ.getCartbyid(idcart).subscribe((res: any) => {
        this.cart = res.data
      });
    });

  }


}
