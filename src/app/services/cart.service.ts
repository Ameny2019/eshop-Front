import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageService } from "primeng/api";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public tempCartItems: any[] = [];
  public tempCartLenghtSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private messageService: MessageService) {
    if (localStorage.getItem('cart') !== null && localStorage.getItem('cart') !== undefined) {
      this.tempCartItems = JSON.parse(localStorage.getItem('cart'));
      this.tempCartLenghtSubject.next(this.tempCartItems.length);
    }
  }

  addToCartTemp(data: any) {
    // check of availibiliy inthe stock
    let availableQuantity = 0;
    if (data.articleInfo.producType === 'estamp') {
      availableQuantity = data.articleInfo.estamp.QunatityEstampDisponible;
    } else {
      availableQuantity = data.articleInfo.efleur.QunatityEfleurDisponible;
    }
    const isAvailble = (availableQuantity >= data.quantity) && (availableQuantity > 0) && (data.quantity > 0);
    if (isAvailble) {
      let product = this.tempCartItems.find((produit) => produit.productId === data.productId);
      if (product === null || product === undefined) {
        this.tempCartItems.push(data);
      } else {
        product.quantity += data.quantity;
      }
      this.messageService.add({ severity: 'success', summary: 'Panier', detail: 'Produit ajouté avec succès.' });
      this.persistCart();
    } else {
      this.messageService.add({ severity: 'info', summary: 'Panier', detail: 'La quantité du produit que vous avez ajouté est insuffisante.' });
    }
  }

  persistCart() {
    let cartStr = JSON.stringify(this.tempCartItems);
    localStorage.setItem('cart', cartStr);
    this.tempCartLenghtSubject.next(this.tempCartItems.length);
  }

  clearCart() {
    this.tempCartItems = [];
    localStorage.removeItem('cart');
    this.tempCartLenghtSubject.next(0);
  }

  deleteItmCart(ind: number) {
    let newList = this.tempCartItems.filter((item, index) => index !== ind);
    this.tempCartItems = newList;
    this.persistCart();
  }

  addProductToCart(product: any) {
    return this.http.post(`${environment.baseURL}/Cart/addItem`, product);
  }

  getCartbyid(idCart:any) {
    return this.http.get(`${environment.baseURL}/Cart/getcartbyid/${idCart}`);
  }

  saveCart(cart: any) {
    return this.http.post(`${environment.baseURL}/cart/createCart`, cart);
  }
  // deleteProductByIdCart(id: any) {
  //   return this.http.delete(
  //     `${environment.baseURL}/Cart/removeSingleProduct/${id}`
  //   );
  // }
  // getCartProduct() {
  //   return this.http.get(`${environment.baseURL}/Cart/getCart`);
  // }

  // deleteCart() {
  //   return this.http.delete(`${environment.baseURL}/Cart/empty-cart`);
  // }

}
