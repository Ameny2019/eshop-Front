import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EditprofileService } from '../../services/editprofile.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  public profileForm: FormGroup;
  public nom: string;
  public role:string; 
  public email:string; 
  public adresse:string; 
  public id:string;
  public tel:Number;
  editForm:FormGroup;






  paymentHandler: any = null;
  stripeAPIKey: any =
    'pk_test_51JdXf9DRYvhLYt7LKXzoEVUDlUQMXzXyDMHYKOEo0RRsLm6ZUYCfgPOaf6AH74OcyORolgD406J76HXvbnIPbLTD00XWoH3GaV';
  modepay: any;
  type: string = 'password';
  constructor(public cartServ: CartService, private authService: AuthService, private router: Router,private formBuilder: FormBuilder,public editprofileService:EditprofileService ) { 
  this.profileForm = this.formBuilder.group({
    addresse: ['', Validators.required],

    client: ['', Validators.required],

    email: ['', Validators.required],

    nom: ['', Validators.required],

    password: ['', Validators.required],

    tel: [''],
   

    
  });
 }
  ngOnInit(): void {
    this.invokeStripe();
    let data = localStorage.getItem('user');
    let user = JSON.parse(data);
    if (user) {
      this.profileForm.controls['client'].setValue(user.nom);
      this.profileForm.controls['email'].setValue(user.email);
      this.nom=user.nom ; 
      this.role = user.role ; 
      this.email = user.email ; 
      this.adresse = user.adresse ; 
      this.id = user._id ;
      this.tel = user.tel ;
      //this.profileForm.controls['addresse'].setValue(user.addresse);
    }

  }

  totalSum(items: any): number {
    let sum: number = 0;
    items.forEach((itm) => {
      sum = sum + itm.quantity * Number(itm.articleInfo.price);
    });
    return sum;
  }

  makePayment(amount: any) {
    if (this.modepay =="choix3") {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: this.stripeAPIKey,
        locale: 'auto',
        currency: 'USD',
        token: function (stripeToken: any) {
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
        description: 'Confirmation des achats',
        amount: amount / 10,
      });
      //this.cartServ.clearCart();

    }

else { this.saveCart()}

    }
    saveCart(){
    let subtotal=this.totalSum(this.cartServ.tempCartItems)/1000;
    let items = [];
    for (let item of this.cartServ.tempCartItems) {
      items.push({
        product_name: item.articleInfo.estamp.sujet,
        quantity: item.quantity,
        price: item.articleInfo.price,
        total: item.articleInfo.price * item.quantity
      })
    }
    let cart:any =
      {subTotal:subtotal,
        items: items,
        user: this.authService.getCoonectedUser()._id
      };
      this.cartServ.saveCart(cart).subscribe((res:any) => {
        this.router.navigate(['/invoice',res._id]);
      });
    }
  //saveCart(cart)


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
