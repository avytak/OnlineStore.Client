import { Injectable } from '@angular/core';
import { StorageType } from '@core/enums/storage-type';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = localStorage;

  public setType(type: StorageType): void {
    this.storage = type === StorageType.Local ? localStorage : sessionStorage;
  }

  public set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
