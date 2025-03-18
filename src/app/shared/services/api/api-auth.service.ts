import { HttpClient } from '@angular/common/http';
import { booleanAttribute, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordValidationResponse, EmailExistenceResponse, RegistrationResponse, LoginResponse } from '../../interfaces/auth-responses';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private readonly URL: string = 'http://example.com';

  constructor(private http: HttpClient) {}

  public validatePassword(
    password: string
  ): Observable<PasswordValidationResponse> {
    return this.http.post<{ valid: boolean }>(`${this.URL}/validate-password`, {
      password,
    });
  }

  // Перевірка чи email вже існує
  public checkEmail(email: string): Observable<EmailExistenceResponse> {
    return this.http.post<{ exists: boolean }>(`${this.URL}/check-email`, {
      email,
    });
  }

  // Реєстрація нового користувача
  public registerUser(
    email: string,
    password: string
  ): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.URL}/register`, {
      email,
      password,
    });
  }

  public loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.URL}/login`, {
      email,
      password,
    });
  }
}
