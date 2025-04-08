import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UiKitModule } from '../../shared/ui-kit/ui-kit.module';
import { InputGroup } from 'primeng/inputgroup';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputGroup,
    FormsModule,
    UiKitModule,
  ],
  exports: [SignupComponent, LoginComponent]
})
export class AuthModule {}
