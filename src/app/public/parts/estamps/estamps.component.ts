import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-estamps',
  templateUrl: './estamps.component.html',
  styleUrls: ['./estamps.component.css']
})
export class CategoriesComponent implements OnInit {
  products: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getEstamps();
  }

  getEstamps() {
    this.homeService.getProducts().subscribe(
      (res: any) => {
        this.products = res.estampsProducts;
      })
  }

}
