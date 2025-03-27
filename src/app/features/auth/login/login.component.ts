import { Component } from '@angular/core';
import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { StorageType } from '@core/enums/storage-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  public isPasswordVisible: boolean = false;
  public authData: FormGroup;
  public destroyRef = inject(DestroyRef);

  constructor(
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiAuthService: ApiAuthService,
  ) {
    this.authData = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      rememberMe: [false],
    });
  }

  public onSubmit(): void {
    this.authData.markAllAsTouched();

    if (this.authData.invalid) {
      return;
    }

    const { email, password, rememberMe } = this.authData.value;
    
    const storageType = rememberMe ? StorageType.Local : StorageType.Session;
    this.authService.initializeStorage(storageType);

    this.apiAuthService.loginUser(email, password)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: ({ token, user }) => {
        if (token && typeof user?.id === 'number' && typeof user.email === 'string') {
          this.authService.setToken(token);
          this.authService.setUser({ id: user.id, email: user.email });
          this.ref.close();
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
      }
    });
  }

  public openSignUp(): void {
    const dialogRef = this.dialogService.open(SignupComponent, {
      modal: true,
      closable: false,
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
