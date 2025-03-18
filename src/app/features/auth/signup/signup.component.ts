import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { LocalStorageAuthService } from '../../../shared/services/local-storage/local-storage-auth.service';

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
    private localStorageAuthService: LocalStorageAuthService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef
  ) {
    this.authData = this.fb.group(
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
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  public passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
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

  public authorization(authType: 'Log In' | 'Sign Up', credentials: { email: string; password: string }): void {
    if (authType === 'Log In') {
      const isAuthenticated = this.localStorageAuthService.loginUser(credentials.email, credentials.password);
      if (isAuthenticated) {
        console.log('Успішний вхід');
      } else {
        console.error('Невірний email або пароль');
      }
    } else if (authType === 'Sign Up') {
      const emailExists = this.localStorageAuthService.checkEmailExists(credentials.email);

      if (emailExists) {
        console.error('Email вже існує');
        return;
      }

      const newUser = {
        id: Date.now(), // Умовний унікальний ідентифікатор
        email: credentials.email,
        password: credentials.password,
      };

      this.localStorageAuthService.registerUser(newUser);
      console.log('Успішна реєстрація');
    } else {
      console.error('Невідомий тип авторизації');
    }

    this.checkFormValidity();
  }

  public onSubmit(): void {
    if (this.authData.valid) {
      const { email, password } = this.authData.value;
      this.authorization('Sign Up', { email, password });
      console.log('Form submitted:', this.authData.value);
      // this.router.navigate(['/dashboard']);
    } else {
      console.error('Form is invalid');
    }
  }

  public openLogIn(): void {
    this.dialogService
      .open(LoginComponent, {
        modal: true,
        closable: true,
      })
      .onClose.subscribe((result) => {
        if (result) {
          const { email, password } = this.authData.value;
          this.ref.close({ email, password });
        }
        this.ref.close();
      });
  }
  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
