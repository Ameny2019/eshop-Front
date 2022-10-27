import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import { Router } from '@angular/router';
import {CartService} from "../../../services/cart.service";
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-topbar1',
  templateUrl: './topbar1.component.html',
  styleUrls: ['./topbar1.component.css']
})
export class Topbar1Component implements OnInit {


  
  
  constructor(private router:Router, public authService: AuthService,public productServ: ProductService, public cartService: CartService) { }

  ngOnInit(): void {}
    
  logout(){
    localStorage.removeItem("state");
    console.log("here navigate vers home")
    this.router.navigateByUrl('');
  }

  


}
