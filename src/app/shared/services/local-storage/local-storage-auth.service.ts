import { Injectable } from '@angular/core';
import { UsersRegistrationData, AuthenticationData } from '../../interfaces/auth-responses';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageAuthService {

  // Отримати дані з локального сховища
  public getStorage(key: string): UsersRegistrationData[] {
    const toParsed = localStorage.getItem(key) ?? '[]';
    return JSON.parse(toParsed);
  }

  // Зберегти дані у локальне сховище
  public setStorage(key: string, value: AuthenticationData | UsersRegistrationData[]): void {
    const toStringifyed = JSON.stringify(value);
    localStorage.setItem(key, toStringifyed);
  }

  // Перевірити, чи існує email у сховищі
  public checkEmailExists(email: string, key: string = 'users'): boolean {
    const users = this.getStorage(key);
    return users.some((user) => user.email === email);
  }

  // Додати нового користувача до сховища
  public registerUser(user: UsersRegistrationData, key: string = 'users'): void {
    const users = this.getStorage(key);
    users.push(user);
    this.setStorage(key, users);
  }

  // Перевірити логін користувача
  public loginUser(email: string, password: string, key: string = 'users'): boolean {
    const users = this.getStorage(key);
    return users.some((user) => user.email === email && user.password === password);
  }

  // Видалити користувача зі сховища
  public deleteUser(email: string, key: string = 'users'): void {
    let users = this.getStorage(key);
    users = users.filter((user) => user.email !== email);
    this.setStorage(key, users);
  }

  // Очистити локальне сховище
  public clearStorage(): void {
    localStorage.clear();
  }
}
