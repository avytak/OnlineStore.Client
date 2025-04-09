import { Component } from '@angular/core';
import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { StorageType } from '@core/enums/storage-type';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { decodeToken } from '@core/utils/jwt.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  public isPasswordVisible = false;
  public authData: FormGroup;
  public loginErrorMessage: string | null = null;
  public destroyRef = inject(DestroyRef);
  public loading: boolean = false;

  constructor(
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiAuthService: ApiAuthService
  ) {
    this.authData = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      rememberMe: [false],
    });
  }

  public onSubmit(): void {
    this.loginErrorMessage = null;
    this.authData.markAllAsTouched();

    if (this.authData.invalid) return;

    this.loading = true;
    const { email, password, rememberMe } = this.authData.value;
    const storageType = rememberMe ? StorageType.Local : StorageType.Session;

    this.authService.initializeStorage(storageType);

    this.apiAuthService.loginUser(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (token: string) => {
          this.authService.setToken(token);

          try {
            const decoded = decodeToken(token);

            if (!decoded) {
              throw new Error('Invalid token data');
            }

            this.authService.setUser({
              id: decoded.id,
              email: decoded.email,
            });

            this.loading = false;
            this.ref.close();
            this.router.navigate(['/home']);
          } catch (err) {
            this.loginErrorMessage = 'Error decoding token.';
            this.loading = false;
          }
        },
        error: (err) => {
          this.loading = false;
          const message = err?.error?.message?.toLowerCase?.() || '';

          if (message.includes('authorization is not confirmed')) {
            this.loginErrorMessage = 'Your account is not verified. Please check your email.';
          } else if (err?.status === 400) {
            this.loginErrorMessage = 'Invalid email or password.';
          } else if (err?.status === 0) {
            this.loginErrorMessage = 'No connection to the server.';
          } else {
            this.loginErrorMessage = 'Authorization is not confirmed. Please check your email to complete verification.';
          }
        }
      });
  }

  public openSignUp(): void {
    this.ref.close();

    const dialogRef = this.dialogService.open(SignupComponent, {
      modal: true,
      closable: true,
    });

    dialogRef.onClose
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.authData.patchValue({
            email: result.email,
            password: result.password,
          });
        }
      });
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
