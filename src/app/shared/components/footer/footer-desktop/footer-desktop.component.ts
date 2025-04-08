import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubscribeButtonComponent } from "../../buttons/subscribe-button/subscribe-button.component";
import { UiKitModule } from '@shared/ui-kit/ui-kit.module';

@Component({
  selector: 'app-footer-desktop',
  imports: [FormsModule, UiKitModule, SubscribeButtonComponent],
  templateUrl: './footer-desktop.component.html',
  styleUrl: './footer-desktop.component.scss'
})
export class FooterDesktopComponent {
  public email: string = '';

  submitForm() {
    console.log('Email введено:', this.email);
  }
}
