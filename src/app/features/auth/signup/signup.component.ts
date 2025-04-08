import { Component } from '@angular/core';
import { inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { AuthService } from '@core/services/auth.service';
import { StorageType } from '@core/enums/storage-type';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PASSWORD_PATTERN } from '@shared/constants/regex.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false,
  providers: [DialogService],
})
export class SignupComponent {
  public isPasswordVisible = false;
  public authData: FormGroup;
  public isFormValid = false;
  public registrationErrorMessage: string | null = null;
  public destroyRef = inject(DestroyRef);
  public loading: boolean = false;

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
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(PASSWORD_PATTERN), Validators.minLength(6)]],
        rePassword: [null, [Validators.required]],
        rememberMe: [false],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    if (password && rePassword && password !== rePassword) {
      control.get('rePassword')?.setErrors({ passwordsNotMatch: true });
    } else {
      const errors = control.get('rePassword')?.errors;
      if (errors) {
        delete errors['passwordsNotMatch'];
        if (Object.keys(errors).length === 0) {
          control.get('rePassword')?.setErrors(null);
        }
      }
    }

    return null;
  }

  public checkFormValidity(): void {
    this.isFormValid = this.authData.valid;
  }

  public onSubmit(): void {
    this.registrationErrorMessage = null;
    this.authData.markAllAsTouched();

    if (this.authData.invalid) {
      return;
    }

    this.loading = true;

    const { email, password, rememberMe } = this.authData.value;
    const storageType = rememberMe ? StorageType.Local : StorageType.Session;
    this.authService.initializeStorage(storageType);

    this.apiAuthService.registerUser(email, password)
      .pipe(
        map(() => ({
          success: true,
          message: 'Registration successful. Please check your email to confirm your account.',
        })),
        catchError((err) => {
          let message = 'Registration failed.';

          if (err?.error?.message?.includes('already exists')) {
            message = 'This email is already registered.';
          } else if (err?.error?.message?.includes('invalid email')) {
            message = 'Please enter a valid email address.';
          } else if (err?.status === 400) {
            message = 'Invalid registration data.';
          } else if (err?.status === 0) {
            message = 'No connection to the server.';
          }

          return of({ success: false, message });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) => {
        this.loading = false;
        
        if (result.success) {
          this.ref.close({ email, password });
        } else {
          this.registrationErrorMessage = result.message;
        }
      });
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
