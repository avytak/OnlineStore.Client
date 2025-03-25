import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { LoginResponse, RegistrationResponse } from '@shared/interfaces/auth-responses';
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

  constructor(
    private fb: FormBuilder,
    private apiAuthService: ApiAuthService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef
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

  public passwordsMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const passwordControl = control.get('password');
    const rePasswordControl = control.get('rePassword');

    if (!passwordControl || !rePasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const rePassword = rePasswordControl.value;

    if (password !== rePassword) {
      rePasswordControl.setErrors({ passwordsNotMatch: true });
      return { passwordsNotMatch: true };
    } else {
      rePasswordControl.setErrors(null);
      return null;
    }
  }

  public checkFormValidity(): void {
    this.isFormValid = this.authData.valid;
  }

  public authorization(
    authType: 'Log In' | 'Sign Up',
    credentials: { email: string; password: string }
  ): Observable<{ success: boolean; message: string }> {
    const { email, password } = credentials;

    if (authType === 'Log In') {
      return this.apiAuthService.loginUser(email, password).pipe(
        map((res: LoginResponse) => {
          if (res.token && res.user) {
            this.setToken(res.token);
            this.setUser(res.user);
            return { success: true, message: 'Login successful' };
          }
          return { success: false, message: res.message || 'Login error' };
        }),
        catchError(() =>
          of({ success: false, message: 'Invalid email or password' })
        )
      );
    }

    if (authType === 'Sign Up') {
      return this.apiAuthService.registerUser(email, password).pipe(
        switchMap((res: RegistrationResponse) => {
          const user = res.user as UserInformation;
    
          if (
            res.success &&
            res.token &&
            user &&
            typeof user.id === 'number' &&
            typeof user.email === 'string'
          ) {
            this.setToken(res.token);
            this.setUser({
              id: user.id,
              email: user.email,
            });
            return of({ success: true, message: 'Registration successful' });
          }
    
          return of({
            success: false,
            message: res.message || 'Registration failed',
          });
        }),
        catchError(() =>
          of({ success: false, message: 'Registration request failed' })
        )
      );
    }
    

    return of({ success: false, message: 'Unknown authorization type' });
  }

  setToken(token: string | undefined) {
    throw new Error('Method not implemented.');
  }
  setUser(user: { id: number; email: string } | undefined) {
    throw new Error('Method not implemented.');
  }

  public onSubmit(): void {
    if (this.authData.valid) {
      const { email, password } = this.authData.value;

      this.authorization('Sign Up', { email, password }).subscribe((result) => {
        if (result.success) {
          console.log('Form submitted:', this.authData.value);
          this.ref.close({ email, password });
        } else {
          console.error(result.message);
        }
      });
      // this.router.navigate(['/dashboard']);
    } else {
      console.error('Form is invalid');
    }
  }

  public openLogIn(): void {
    const dialogRef = this.dialogService.open(LoginComponent, {
      modal: true,
      closable: true,
    });

    const subscription = dialogRef.onClose.subscribe((result) => {
      if (result) {
        const { email, password } = this.authData.value;
        this.ref.close({ email, password });
      } else {
        this.ref.close();
      }

      subscription.unsubscribe();
    });
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
