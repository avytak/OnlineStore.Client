import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SubscribeButtonComponent } from "../../buttons/subscribe-button/subscribe-button.component";

@Component({
  selector: 'app-footer-desktop',
  imports: [FormsModule, InputTextModule, InputGroupModule, ButtonModule, SubscribeButtonComponent],
  templateUrl: './footer-desktop.component.html',
  styleUrl: './footer-desktop.component.scss'
})
export class FooterDesktopComponent {
  public email: string = '';

  submitForm() {
    console.log('Email введено:', this.email);
  }
}
