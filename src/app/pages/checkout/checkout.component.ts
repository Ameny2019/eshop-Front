import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { CartService } from "../../services/cart.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { EditprofileService } from '../../services/editprofile.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public id: string;
  public nom: string;
  public tel: Number;
  public email: string;
  public adresse: string;

  paymentHandler: any = null;
  stripeAPIKey: any = environment.stripeAPIKey;
  modepay: any;
  type: string = 'password';
  constructor(public cartServ: CartService,
    private authService: AuthService,
    private router: Router,
    public editprofileService: EditprofileService,
    ) {
  }
  ngOnInit(): void {
    this.invokeStripe();
    this.editprofileService
    .getProfile()
    .subscribe((result: any) => {
      this.id = result.data._id;
      this.nom = result.data.nom;
      this.tel = result.data.tel;
      this.email = result.data.email;
      this.adresse = result.data.adresse;
    });
  }

  totalSum(items: any): number {
    let sum: number = 0;
    items.forEach((item:any) => {
      const price = item?.articleInfo.producType == 'estamp' ? Number(item.articleInfo.price) : Number(item.articleInfo.price) *1000;
      sum += item.quantity * price;
    });
    return sum;
  }

  makePayment(amount: any) {
    if (this.modepay == "choix3") {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: this.stripeAPIKey,
        locale: 'auto',
        currency: 'USD',
        token: (stripeToken: any) => {
          console.log(stripeToken);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Votre commande à été effectuer avec success',
            showConfirmButton: false,
          }).then(() => {

          });
        },
      });

      paymentHandler.open({
        name: 'La Poste Tunisienne',
        email: this.email,
        description: 'Confirmation des achats',
        amount: amount / 10,
      });
      //this.cartServ.clearCart();

    }

    else { this.saveCart() }

  }

  saveCart() {
    let subtotal = this.totalSum(this.cartServ.tempCartItems) / 1000;
    let items = [];
    for (let item of this.cartServ.tempCartItems) {
      const productName = item?.articleInfo.producType == 'estamp' ? item.articleInfo.estamp.sujet : item.articleInfo.efleur?.nom;
      items.push({
        product_name: productName,
        quantity: item.quantity,
        price: item.articleInfo.price,
        total: item.articleInfo.price * item.quantity
      })
    }
    let cart: any =
    {
      subTotal: subtotal,
      items: items,
      user: this.authService.getCoonectedUser()._id
    };
    this.cartServ.saveCart(cart).subscribe((res: any) => {
      this.router.navigate(['/invoice', res._id]);
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

}
