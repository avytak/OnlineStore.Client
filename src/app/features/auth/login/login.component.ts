import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignupComponent } from '../signup/signup.component';
import { LocalStorageAuthService } from '../../../shared/services/local-storage/local-storage-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
  providers: [DialogService],
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
    });
  }

  public onSubmit(): void {
    if (this.authData.invalid) {
      return;
    }

    const { email, password } = this.authData.value;
    const isAuthenticated = this.localStorageAuthService.loginUser(email, password);

    if (isAuthenticated) {
      console.log('Login successful');
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Invalid email or password');
    }
  }

  public openSignUp(): void {
    this.dialogService
      .open(SignupComponent, {
        modal: true,
        closable: false,
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.authData.setValue({ email: result.email, password: result.password });
        }
      });
  }
  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
