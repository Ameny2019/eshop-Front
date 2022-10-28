import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-efleure',
  templateUrl: './efleure.component.html',
  styleUrls: ['./efleure.component.css']
})
export class EfleureComponent implements OnInit {
  products: any;
  
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getEfleurs();
  }

  getEfleurs() {
    this.homeService.getProducts().subscribe(
      (res: any) => {
        this.products = res.fleursProducts;
      }
    )
  }
}

