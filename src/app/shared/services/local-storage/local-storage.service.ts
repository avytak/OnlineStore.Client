import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  // Збереження email та токена
  public storeUserData(email: string, token: string): void {
    localStorage.setItem('userEmail', email);
    // localStorage.setItem('authToken', token);
  }

  // Завантаження email
  public loadUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Завантаження токена
  public loadAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Очищення даних користувача
  public clearUserData(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
  }

  // Додавання товару в кошик
  public addToCart(productId: string, quantity: number): void {
    let cart = this.loadCart();
    cart[productId] = (cart[productId] || 0) + quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Отримання кошика
  public loadCart(): Record<string, number> {
    return JSON.parse(localStorage.getItem('cart') || '{}');
  }

  // Видалення товару з кошика
  public removeFromCart(productId: string): void {
    let cart = this.loadCart();
    delete cart[productId];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Очищення кошика
  public clearCart(): void {
    localStorage.removeItem('cart');
  }
}
