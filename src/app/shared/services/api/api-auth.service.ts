import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { booleanAttribute, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PasswordValidationResponse,
  EmailExistenceResponse,
  RegistrationResponse,
  LoginResponse,
} from '../../interfaces/auth-responses';
import { UserInformation } from '../../interfaces/user-information';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private readonly URL: string = 'https://dressify.onrender.com/api/v1/users';

  constructor(private http: HttpClient) {}

  // Реєстрація нового користувача
  public registerUser(
    email: string,
    password: string
  ): Observable<RegistrationResponse> {
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http.post<RegistrationResponse>(
      `${this.URL}/create`,
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }

  // LogIn
  public loginUser(email: string, password: string): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<LoginResponse>(
      `${this.URL}/login`,
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }

   // verify
  public verifyUser(code: string, id: string): Observable<any> {
    const params = new HttpParams()
      .set('verificationCode', code)
      .set('id', id);

    return this.http.get(`${this.URL}/verify`, { params });
  }

// Отримати поточного користувача
public getCurrentUser(): Observable<UserInformation> {
  return this.http.get<UserInformation>(`${this.URL}/current`);
}
 // send token (верифікаційний)
public sendToken(email: string): Observable<any> {
  const body = new HttpParams().set('email', email);

  return this.http.post(`${this.URL}/send-token`, body.toString(), {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  });
}

// Update dataUser
public updateUser(data: Partial<UserInformation>): Observable<UserInformation> {
  const body = new HttpParams({ fromObject: data as any });

  return this.http.patch<UserInformation>(`${this.URL}/update`, body.toString(), {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  });
}

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
}
