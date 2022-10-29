import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {
  fleursProducts: any;
  estampsProducts: any;
  searchText: string;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.homeService.getProducts(40).subscribe(
      (res: any) => {
        this.fleursProducts = res.fleursProducts;
        this.estampsProducts = res.estampsProducts;
      });
  }


}
