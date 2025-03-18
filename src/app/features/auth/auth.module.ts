import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CheckPasswordEqualDirective } from './directives/check-password-equal.directive';

@NgModule({
  declarations: [LoginComponent, SignupComponent, CheckPasswordEqualDirective],
  imports: [
    FormsModule,
    InputTextModule,
    Message,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
  ]
})
export class AuthModule {}
