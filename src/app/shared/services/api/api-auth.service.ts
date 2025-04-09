import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, VerifyResponse, SendTokenResponse, UpdateUserRequest } from '../../interfaces/auth-responses';
import { UserInformation } from '../../interfaces/user-information';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private readonly apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  public registerUser(
    email: string,
    password: string
  ): Observable<UserInformation> {
    const body = { email, password };
    return this.http.post<UserInformation>(`${this.apiUrl}/create`, body);
  }

  public loginUser(email: string, password: string): Observable<string> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, {
      responseType: 'text',
    });
  }

  public verifyUser(code: string, id: string): Observable<VerifyResponse> {
    return this.http.get<VerifyResponse>(`${this.apiUrl}/verify`, {
      params: { verificationCode: code, id },
    });
  }

  public getCurrentUser(): Observable<UserInformation> {
    return this.http.get<UserInformation>(`${this.apiUrl}/current`);
  }

  public sendToken(email: string): Observable<SendTokenResponse> {
    const body = { email };
    return this.http.post<SendTokenResponse>(`${this.apiUrl}/send-token`, body);
  }

  public updateUser(data: UpdateUserRequest): Observable<UserInformation> {
    return this.http.patch<UserInformation>(`${this.apiUrl}/update`, data);
  }
}
