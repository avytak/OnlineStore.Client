import { Component } from '@angular/core';
import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { StorageType } from '@core/enums/storage-type';
import { ApiAuthService } from '@shared/services/api/api-auth.service';

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
    private config: DynamicDialogConfig,
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

    this.apiAuthService
      .loginUser(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (token: string) => {
          this.loading = false;

          if (!token) {
            this.loginErrorMessage = 'No token received.';
            return;
          }

          this.authService.setToken(token);
          this.authService.setUser({ id: 1, email });

          this.ref.close();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          const errorMessage = err?.error?.message || 'Login failed';
          const statusCode = err?.status;

          if (errorMessage?.toLowerCase().includes('authorization is not confirmed')) {
            this.loginErrorMessage = 'Your account is not verified. Please check your email.';
          } else if (statusCode === 400) {
            this.loginErrorMessage = 'Invalid email or password.';
          } else if (statusCode === 0) {
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
