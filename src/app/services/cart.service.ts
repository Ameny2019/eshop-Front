import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public tempCartItems: any[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) {
    if (localStorage.getItem('cart') !== null && localStorage.getItem('cart') !== undefined) {
      this.tempCartItems = JSON.parse(localStorage.getItem('cart'));
    }
  }

  addToCartTemp(data: any) {
    // check of availibiliy inthe stock
    let availableQuantity = 0;
    if(data.articleInfo.producType === 'estamp'){
      availableQuantity = data.articleInfo.estamp.QunatityEstampDisponible;
    }else{
      availableQuantity = data.articleInfo.efleur.QunatityEfleurDisponible;
    }
    const isAvailble = (availableQuantity <= data.quantity) && (availableQuantity > 0);
    if(isAvailble){
      let product = this.tempCartItems.find((produit) => produit.productId === data.productId);
      if (product === null || product === undefined) {
        this.tempCartItems.push(data);
      } else {
        product.quantity += data.quantity;
      }
      this.messageService.add({severity: 'success', summary: 'Panier', detail: 'Produit ajouté avec succès.'});
      this.persistCart();
    }else{
      this.messageService.add({severity: 'info', summary: 'Panier', detail: 'La quantité du produit que vous avez ajouté est insuffisante.'});
    }
  }

  getAllQuantity() {
    let quantite = 0;
    this.tempCartItems.forEach((item) => quantite += item.quantity);
    return quantite;
  }

  addProductToCart(product: any) {
    return this.http.post(`${environment.baseURL}/Cart/addItem`, product);
  }

  persistCart() {
    let cartStr = JSON.stringify(this.tempCartItems);
    localStorage.setItem('cart', cartStr);
  }

  getCartProduct() {
    return this.http.get(`${environment.baseURL}/Cart/getCart`);
  }

  getCartbyid(idcart) {
    return this.http.get(`${environment.baseURL}/Cart/getcartbyid/${idcart}`);
  }

  deleteCart() {
    return this.http.delete(`${environment.baseURL}/Cart/empty-cart`);
  }
  saveCart(cart) {
    return this.http.post(`${environment.baseURL}/cart/createCart`, cart);
  }

  deleteProductByIdCart(id: any) {
    return this.http.delete(
      `${environment.baseURL}/Cart/removeSingleProduct/${id}`
    );
  }

  deleteItmCart(ind: number) {
    let newList = this.tempCartItems.filter((item, index) => index !== ind);
    this.tempCartItems = newList;
    this.persistCart();
  }

  clearCart() {
    this.tempCartItems = [];
    localStorage.removeItem('cart');
  }
}
