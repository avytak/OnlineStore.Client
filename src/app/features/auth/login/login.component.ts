import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignupComponent } from '../signup/signup.component';
import { LocalStorageAuthService } from '@shared/services/local-storage/local-storage-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  public isPasswordVisible: boolean = false;
  public authData: FormGroup;

  constructor(
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private router: Router,
    private localStorageAuthService: LocalStorageAuthService
  ) {
    this.authData = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      rememberMe: [false],
    });
  }

  public onSubmit(): void {
    console.log('FORM SUBMITTED');
    this.authData.markAllAsTouched();

    if (this.authData.invalid) {
      console.warn('Form is invalid')
      return;
    }

    const { email, password } = this.authData.value;
    const isAuthenticated = this.localStorageAuthService.loginUser(
      email,
      password
    );

    if (isAuthenticated) {
      console.log('Login successful');
      this.ref.close({ email, password });
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Invalid email or password');
    }
  }

  public openSignUp(): void {
    const dialogRef = this.dialogService.open(SignupComponent, {
      modal: true,
      closable: false,
    });
  
    const subscription = dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.authData.setValue({
          email: result.email,
          password: result.password,
        });
      }
  
      subscription.unsubscribe();
    });
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
