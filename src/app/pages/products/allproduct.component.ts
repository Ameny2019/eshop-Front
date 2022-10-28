import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {
  products: any;
  searchText: string;
  n: number = 0;
  constructor(private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.homeService.getProducts().subscribe(
      (res: any) => {
        this.products = res.filter(item => {
          if (this.n < 80 && (item.producType == "efleur" || item.producType == "estamp")) {
            this.n++;
            return true;
          } else { return false }
        });
      }
    )
  }

  toDetail(product: any) {
    localStorage.setItem('productToDetail', JSON.stringify(product));
    this.router.navigateByUrl("/details")
  }


}
