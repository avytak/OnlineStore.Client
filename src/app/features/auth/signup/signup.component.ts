import { Component } from '@angular/core';
import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { LoginResponse } from '@shared/interfaces/auth-responses';
import { AuthService } from '@core/services/auth.service';
import { StorageType } from '@core/enums/storage-type';
import { AuthType } from '@core/enums/auth-type';
import { UserInformation } from '@shared/interfaces/user-information';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false,
  providers: [DialogService],
})
export class SignupComponent {
  public isPasswordVisible: boolean = false;
  public authData: FormGroup;
  public isFormValid: boolean = false;
  public destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private apiAuthService: ApiAuthService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private authService: AuthService
  ) {
    this.authData = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.fb.group(
      {
        email: [null, [Validators.email, Validators.required]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$`),
            Validators.minLength(6),
          ],
        ],
        rePassword: [null, [Validators.required]],
        rememberMe: [false],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  public passwordsMatchValidator( control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.get('password')?.value;
    const rePasswordControl = control.get('rePassword')?.value;

    return passwordControl !== rePasswordControl ? { passwordsNotMatch: true } : null;
  }

  public checkFormValidity(): void {
    this.isFormValid = this.authData.valid;
  }

  public register(
    authType: AuthType,
    credentials: { email: string; password: string }
  ): Observable<{ success: boolean; message: string }> {
    const { email, password } = credentials;
  
    if (authType === AuthType.LogIn) {
      return this.apiAuthService.loginUser(email, password).pipe(
        map((res: LoginResponse) => {
          const user = res.user;
          if (
            res.token &&
            user &&
            typeof user.id === 'number' &&
            typeof user.email === 'string'
          ) {
            this.authService.setToken(res.token);
            this.authService.setUser({
              id: user.id,
              email: user.email,
            });
            return { success: true, message: 'Login successful' };
          }
          return { success: false, message: res.message || 'Login error' };
        }),
        catchError(() =>
          of({ success: false, message: 'Invalid email or password' })
        )
      );
    }
  
    if (authType === AuthType.SignUp) {
      return this.apiAuthService.registerUser(email, password).pipe(
        map((user: UserInformation) => {
          if (typeof user.id === 'number' && typeof user.email === 'string') {
            this.authService.setUser({ id: user.id, email: user.email });
            return { success: true, message: 'Registration successful' };
          }
          return { success: false, message: 'Invalid registration response' };
        }),
        catchError((err) => {
          const message = err?.error?.message || 'Registration request failed';
          return of({ success: false, message });
        })
      );
    }
  
    return of({ success: false, message: 'Unknown authorization type' });
  }


  public onSubmit(): void {
    this.authData.markAllAsTouched();

    if (this.authData.invalid) {
      return;
    }

    const { email, password, rememberMe } = this.authData.value;
    const storageType = rememberMe ? StorageType.Local : StorageType.Session;
    this.authService.initializeStorage(storageType);

    this.register(AuthType.SignUp, { email, password })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      (result) => {
        if (result.success) {
          this.ref.close({ email, password });
        }
      }
    );
  }

  public openLogIn(): void {
    const dialogRef = this.dialogService.open(LoginComponent, {
      modal: true,
      closable: true,
    });

    dialogRef.onClose
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((result) => {
      if (result) {
        this.authData.setValue({
          email: result.email,
          password: result.password,
          rememberMe: false,
        });
      }
      this.ref.close();
    });
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
