import { Component, HostListener } from '@angular/core';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { NewInSectionComponent } from './new-in-section/new-in-section.component';
import { BestsellersComponent } from './bestsellers/bestsellers.component';
import { SpecialSaleComponent } from './special-sale/special-sale.component';
import { BrandsComponent } from './brands/brands.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroBannerComponent,
    NewInSectionComponent,
    BestsellersComponent,
    SpecialSaleComponent,
    BrandsComponent,
    HeaderComponent,
    FooterComponent,
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
