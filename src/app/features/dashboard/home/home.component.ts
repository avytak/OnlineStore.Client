import { Component, HostListener } from '@angular/core';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { DiscoverButtonComponent } from "@shared/components/buttons/discover-button/discover-button.component";

@Component({
  selector: 'app-home',
  imports: [
    HeroBannerComponent,
    HeaderComponent,
    FooterComponent,
    DiscoverButtonComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
