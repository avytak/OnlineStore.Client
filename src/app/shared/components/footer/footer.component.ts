import { Component, HostListener } from '@angular/core';
import { FooterMobileComponent } from "./footer-mobile/footer-mobile.component";
import { FooterDesktopComponent } from "./footer-desktop/footer-desktop.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [FooterMobileComponent, FooterDesktopComponent, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isDesktop = window.innerWidth > 640;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isDesktop = window.innerWidth > 640;
  }

}
