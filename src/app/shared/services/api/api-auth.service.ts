import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { booleanAttribute, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, VerifyResponse, SendTokenResponse, UpdateUserRequest } from '../../interfaces/auth-responses';
import { UserInformation } from '../../interfaces/user-information';
import { environment } from 'src/environments/environment';

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
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);
  
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
  
    return this.http.post<UserInformation>(
      `${this.apiUrl}/create`,
      body.toString(),
      { headers }
    );
  }
  
  // LogIn
  public loginUser(email: string, password: string): Observable<LoginResponse> {
    const body = new HttpParams()
    .set('email', email)
    .set('password', password);

  const headers = new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );

  return this.http.post<LoginResponse>(
    `${this.apiUrl}/login`,
    body.toString(),
    { headers }
  );
  }

  // verify
  public verifyUser(code: string, id: string): Observable<VerifyResponse> {
    const params = new HttpParams()
    .set('verificationCode', code)
    .set('id', id);

  return this.http.get<VerifyResponse>(`${this.apiUrl}/verify`, { params });
  }

  // Отримати поточного користувача
  public getCurrentUser(): Observable<UserInformation> {
    return this.http.get<UserInformation>(`${this.apiUrl}/current`);
  }
  // send token (верифікаційний)
  public sendToken(email: string): Observable<SendTokenResponse> {
    const body = new HttpParams().set('email', email);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post<SendTokenResponse>(
      `${this.apiUrl}/send-token`,
      body.toString(),
      { headers }
    );
  }

  // Update dataUser
  public updateUser(data: UpdateUserRequest): Observable<UserInformation> {
    const body = new HttpParams({ fromObject: {
      ...(data.email && { email: data.email }),
      ...(data.password && { password: data.password }),
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.role && { role: Array.isArray(data.role) ? data.role.join(',') : data.role }),
      ...(data.birthDay && { birthDay: data.birthDay }),
      ...(data.phone && { phone: data.phone }),
    }});

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
  
    return this.http.patch<UserInformation>(
      `${this.apiUrl}/update`,
      body.toString(),
      { headers }
    );
  }
}
