import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageType } from '@core/enums/storage-type';
import { UserInformation } from '@shared/interfaces/user-information';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'user';

  constructor(private storage: StorageService) {
    this.storage.setType(StorageType.Local);
  }

  public setToken(token: string): void {
    this.storage.set(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return this.storage.get<string>(this.TOKEN_KEY);
  }

  public setUser(user: UserInformation): void {
    this.storage.set(this.USER_KEY, user);
  }

  public getUser(): UserInformation | null {
    return this.storage.get<UserInformation>(this.USER_KEY);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    this.storage.remove(this.TOKEN_KEY);
    this.storage.remove(this.USER_KEY);
  }

  public initializeStorage(type: StorageType): void {
    this.storage.setType(type);
  }
}
